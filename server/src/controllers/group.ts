import { NextFunction, Response } from "express";

import { CommonRequest } from "../types";
import { IGroupPopulated } from "../types/group";

import { calculateSettlements } from "../services/expenseCalculator";

import { deleteFile } from "../utils/fileUpload";

import Group from "../models/group";
import GroupInvitation from "../models/group-invitation";
import Expense from "../models/expense";

import AppError from "../error";

const getGroup = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  const { groupId } = req.params;

  try {
    const group = (await Group.findOne({
      _id: groupId,
      users: userId, // Verify user is in the users array
    })
      .populate("users", "name email") // You can add more fields if needed
      .populate("expenses")) as IGroupPopulated | null;

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    // Calculate who owes whom
    const settlementResult = calculateSettlements(group.users, group.expenses);

    // Return the group data with settlement information
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
  const userId = req.user?.id;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  try {
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
  const userId = req.user?.id;

  const query = req.query.query as string;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  try {
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

const settleUp = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({
      _id: groupId,
      users: userId,
    });

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    await Expense.deleteMany({ groupId });

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
  const userId = req.user?.id;
  const { groupId } = req.params;
  const { title, description, img } = req.body;

  try {
    const group = await Group.findOne({
      _id: groupId,
      users: userId, // Verify user is in the users array
    })
      .populate("users", "name email")
      .populate("expenses");

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    group.title = title ?? group.title;
    group.description = description ?? group.description;
    group.img = img ?? group.img;

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
  const userId = req.user?.id;
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({
      _id: groupId,
      users: userId,
    });

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    await Expense.deleteMany({ groupId });
    await GroupInvitation.deleteMany({ groupId });

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
  settleUp,
  createGroup,
  updateGroup,
  deleteGroup,
};
