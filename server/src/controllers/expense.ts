import { NextFunction, Response } from "express";

import { CommonRequest } from "../types";
import { IGroupPopulated } from "../types/group";

import Expense from "../models/expense";
import Group from "../models/group";

import AppError from "../error";
import { calculateSettlements } from "../services/expenseCalculator";

const addExpense = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { group: groupId, description, amount } = req.body;

    const group = await Group.findOne({
      _id: groupId,
      users: userId, // Verify user is in the users array
    });

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    const newExpense = new Expense({
      description,
      amount,
      user: userId,
      group: groupId,
    });

    const savedExpense = await newExpense.save();

    await savedExpense.populate("user", "name email");

    group.expenses = [...group.expenses, savedExpense.id];

    await group.save();

    // Fetch updated group with populated data to calculate settlements
    const updatedGroup = (await Group.findById(groupId)
      .populate("users", "name")
      .populate("expenses")) as IGroupPopulated | null;

    if (!updatedGroup) {
      throw new AppError("Failed to fetch updated group", 500);
    }

    const settlementResult = calculateSettlements(
      updatedGroup.users,
      updatedGroup.expenses
    );

    res.status(200).json({
      success: true,
      data: {
        expense: savedExpense,
        settlementResult,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { expenseId } = req.params;
    const { group: groupId, description, amount } = req.body;

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      throw new AppError("Resource not found", 404);
    }

    const group = await Group.findOne({
      _id: groupId,
      users: userId, // Verify user is in the users array
    });

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    expense.description = description ?? expense.description;
    expense.amount = amount ?? expense.amount;

    const updatedExpense = await expense.save();

    await updatedExpense.populate("user", "name email");

    // Fetch updated group with populated data to calculate settlements
    const updatedGroup = (await Group.findById(expense.group)
      .populate("users", "name")
      .populate("expenses")) as IGroupPopulated | null;

    if (!updatedGroup) {
      throw new AppError("Failed to fetch updated group", 500);
    }

    const settlementResult = calculateSettlements(
      updatedGroup.users,
      updatedGroup.expenses
    );

    res.status(200).json({
      success: true,
      data: {
        expense: updatedExpense,
        settlementResult,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { expenseId } = req.params;

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      throw new AppError("Resource not found", 404);
    }

    const group = await Group.findOne({
      _id: expense.group,
      users: userId, // Verify user is in the users array
    });

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    await Expense.findByIdAndDelete(expenseId);

    await Group.findByIdAndUpdate(expense.group, {
      $pull: { expenses: expenseId },
    });

    // Fetch updated group with populated data to calculate settlements
    const updatedGroup = (await Group.findById(expense.group)
      .populate("users", "name")
      .populate("expenses")) as IGroupPopulated | null;

    if (!updatedGroup) {
      throw new AppError("Failed to fetch updated group", 500);
    }

    const settlementResult = calculateSettlements(
      updatedGroup.users,
      updatedGroup.expenses
    );

    res.status(200).json({
      success: true,
      data: settlementResult,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addExpense,
  updateExpense,
  deleteExpense,
};
