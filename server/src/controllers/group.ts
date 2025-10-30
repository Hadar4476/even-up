import { NextFunction, Response } from "express";

import { CommonRequest } from "../types";
import { IGroupPopulated } from "../types/group";
import { GroupInvitationStatus } from "../types/group-invitation";

import { calculateSettlements } from "../services/expenseCalculator";

import { deleteFile } from "../utils/fileUpload";

import Group from "../models/group";
import User from "../models/user";
import GroupInvitation from "../models/group-invitation";
import Expense from "../models/expense";

import AppError from "../error";

const getGroup = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { groupId } = req.params;

    const group = (await Group.findOne({
      _id: groupId,
      users: userId, // Verify user is in the users array
    })
      .populate("users", "name email")
      .populate({
        path: "expenses",
        populate: {
          path: "user",
          select: "name email",
        },
      })) as IGroupPopulated | null;

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    // Calculate who owes whom
    const settlementResult = calculateSettlements(group.users, group.expenses);

    res.status(200).json({
      success: true,
      data: {
        group,
        settlementResult,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllGroups = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const total = await Group.countDocuments({
      users: { $in: [userId] },
    });

    const groups = await Group.find({
      users: { $in: [userId] },
    })
      .select("-expenses")
      .populate("users", "name email")
      .sort({ updatedAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit);

    const hasMore = skip + groups.length < total;

    const pagination = {
      page,
      limit,
      hasMore,
    };

    res.status(200).json({ success: true, data: { groups, pagination } });
  } catch (error) {
    next(error);
  }
};

const searchGroups = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const query = req.query.query as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const groups = await Group.find({
      $text: { $search: query },
      users: userId,
    })
      .select("-expenses")
      .limit(limit)
      .skip(skip)
      .sort({ score: { $meta: "textScore" } }) // Sort by relevance
      .lean(); // Convert to plain JavaScript objects for better performance

    const total = await Group.countDocuments({
      $text: { $search: query },
      users: userId,
    });

    const hasMore = skip + groups.length < total;

    const pagination = {
      page,
      limit,
      hasMore,
    };

    res.status(200).json({ success: true, data: { groups, pagination } });
  } catch (error) {
    next(error);
  }
};

const searchUsers = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId } = req.params;
    const userId = req.user?.id;

    const query = req.query.query as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const searchRegex = new RegExp(query, "i");

    let excludedUserIds = [userId];

    const group = await Group.findById(groupId);

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    const usersInGroup = group.users.map((id) => id.toString());

    const pendingInvitations = await GroupInvitation.find({
      group: groupId,
      status: GroupInvitationStatus.PENDING,
    }).select("to");

    const usersWithPendingInvites = pendingInvitations.map((inv) =>
      inv.to.toString()
    );

    excludedUserIds = [
      ...excludedUserIds,
      ...usersInGroup,
      ...usersWithPendingInvites,
    ];

    const filter = {
      _id: { $nin: excludedUserIds },
      $or: [{ name: searchRegex }, { email: searchRegex }],
    };

    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
      .select("-password -phoneNumber")
      .skip(skip)
      .limit(limit);

    const hasMore = skip + users.length < total;

    const pagination = {
      page,
      limit,
      hasMore,
    };

    res.status(200).json({ success: true, data: { users, pagination } });
  } catch (error) {
    next(error);
  }
};

const settleUp = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { groupId } = req.params;

    const group = await Group.findOne({
      _id: groupId,
      users: userId,
    });

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    await Expense.deleteMany({ group: groupId });

    await Group.findByIdAndUpdate(groupId, {
      $set: { expenses: [] },
    });

    res
      .status(200)
      .json({ success: true, message: "Group has been settled up" });
  } catch (error) {
    next(error);
  }
};

const createGroup = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { title, description } = req.body;
    const img = req.file ? req.file.filename : "";

    const newGroup = new Group({ title, description, img, users: [userId] });

    const savedGroup = await newGroup.save();

    res.status(200).json({ success: true, data: savedGroup });
  } catch (error) {
    if (req.file) deleteFile(req.file.filename);
    next(error);
  }
};

const updateGroup = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { groupId } = req.params;
    const { title, description, removeImg } = req.body;
    const img = req.file ? req.file.filename : null;

    const group = await Group.findOne({
      _id: groupId,
      users: userId, // Verify user is in the users array
    })
      .populate("users", "name email")
      .populate("expenses");

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    if (group.img && !img) {
      deleteFile(group.img);
    }

    group.title = title ?? group.title;
    group.description = description ?? group.description;

    if (removeImg) {
      // User explicitly removed the image
      if (group.img) {
        deleteFile(group.img);
        group.img = "";
      }
    } else if (img) {
      // New image uploaded - delete old one if exists
      if (group.img) {
        deleteFile(group.img);
      }
      group.img = img;
    }

    const updatedGroup = await group.save();

    res.status(200).json({ success: true, data: updatedGroup });
  } catch (error) {
    next(error);
  }
};

const deleteGroup = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { groupId } = req.params;

    const group = await Group.findOne({
      _id: groupId,
      users: userId,
    });

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    if (group.img) {
      deleteFile(group.img);
    }

    await Expense.deleteMany({ group: groupId });
    await GroupInvitation.deleteMany({ group: groupId });

    await Group.findByIdAndDelete(groupId);

    res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getGroup,
  getAllGroups,
  searchGroups,
  searchUsers,
  settleUp,
  createGroup,
  updateGroup,
  deleteGroup,
};
