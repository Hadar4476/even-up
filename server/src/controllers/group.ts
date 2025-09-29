import { NextFunction, Response } from "express";
import { Document } from "mongoose";

import { CommonRequest } from "../types";
import { IUser } from "../types/user";
import { IExpense } from "../types/expense";

import { calculateSettlements } from "../services/expenseCalculator";

import Group from "../models/group";
import GroupInvitation from "../models/group-invitation";
import Expense from "../models/expense";

import AppError from "../error";

interface IGroupPopulated extends Document {
  title: string;
  description: string;
  img?: string;
  users: IUser[];
  expenses: IExpense[];
  createdAt: Date;
  updatedAt: Date;
}

const getGroup = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { groupId } = req.params;
  const userId = req.user?.id;

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
    const settlementData = calculateSettlements(group.users, group.expenses);

    // Return the group data with settlement information
    res.status(200).json({
      success: true,
      data: {
        group: {
          _id: group._id,
          title: group.title,
          description: group.description,
          img: group.img,
          users: group.users.map((user) => ({
            _id: user._id,
            name: user.name,
            email: user.email,
          })),
          expenses: group.expenses.map((expense) => ({
            _id: expense._id,
            description: expense.description,
            amount: expense.amount,
            userId: expense.userId,
            createdAt: expense.createdAt,
            updatedAt: expense.updatedAt,
          })),
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
        },
        settlement: {
          totalExpenses: settlementData.totalExpenses,
          perPersonShare: settlementData.perPersonShare,
          balances: settlementData.balances,
          settlements: settlementData.settlements,
        },
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
      .populate("users", "name");

    res.status(200).json({ groups });
  } catch (error) {
    next(error);
  }
};

const createGroup = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, description, img } = req.body;
  const userId = req.user?.id;

  try {
    const newGroup = new Group({ title, description, img, users: [userId] });

    const savedGroup = await newGroup.save();

    res.status(200).json(savedGroup);
  } catch (error) {
    next(error);
  }
};

const updateGroup = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { groupId } = req.params;
  const { title, description, img } = req.body;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    group.title = title;
    group.description = description;
    group.img = img;

    const updatedGroup = await group.save();

    res.status(200).json(updatedGroup);
  } catch (error) {
    next(error);
  }
};

const deleteGroup = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId);

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

const settleUp = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { groupId } = req.params;
  const { settlements } = req.body; // Array of { from, to, amount }

  try {
    // Verify the group exists and user has access
    const group = await Group.findById(groupId);

    if (!group) {
      throw new AppError("Group not found", 404);
    }

    // Create settlement expenses (negative amounts for the payer)
    const settlementExpenses = settlements.map((settlement: any) => ({
      description: `Settlement: ${settlement.from} pays ${settlement.to}`,
      amount: -settlement.amount, // Negative because it's a payment, not an expense
      userId: settlement.from,
      groupId: groupId,
    }));

    await Expense.insertMany(settlementExpenses);

    // Get updated balances
    // const updatedSummary = await calculateSettlements(group);

    // res.status(200).json({
    //   success: true,
    //   message: "Settlements recorded successfully",
    //   summary: updatedSummary,
    // });
  } catch (error) {
    next(error);
  }
};

export default {
  getGroup,
  getAllGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  settleUp,
};
