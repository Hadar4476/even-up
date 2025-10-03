import { NextFunction, Response } from "express";

import { CommonRequest } from "../types";
import { IGroupPopulated } from "../types/group";

import { calculateSettlements } from "../services/expenseCalculator";

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
    const settlement = calculateSettlements(group.users, group.expenses);

    // Return the group data with settlement information
    res.status(200).json({
      success: true,
      data: {
        group,
        settlement,
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

  try {
    const groups = await Group.find({
      users: { $in: [userId] },
    })
      .select("-expenses")
      .populate("users", "name email");

    res.status(200).json({ success: true, data: groups });
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
  const userId = req.user?.id;
  const { title, description, img } = req.body;

  try {
    const newGroup = new Group({ title, description, img, users: [userId] });

    const savedGroup = await newGroup.save();

    res.status(200).json({ success: true, data: savedGroup });
  } catch (error) {
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
  settleUp,
  createGroup,
  updateGroup,
  deleteGroup,
};
