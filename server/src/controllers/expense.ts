import { NextFunction, Response } from "express";
import { CommonRequest } from "../types";

import Expense from "../models/expense";
import Group from "../models/group";

import AppError from "../error";

const addExpense = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { groupId, description, amount } = req.body;
  const userId = req.user?.id;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    const newExpense = new Expense({ description, amount, userId, groupId });

    const savedExpense = await newExpense.save();

    group.expenses = [...group.expenses, savedExpense.id];

    await group.save();

    res.status(200).json(savedExpense);
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { expenseId } = req.params;
  const { description, amount } = req.body;

  try {
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      throw new AppError("Resource not found", 404);
    }

    expense.description = description;
    expense.amount = amount;

    const updatedExpense = await expense.save();

    res.status(200).json(updatedExpense);
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { expenseId } = req.params;

  try {
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      throw new AppError("Resource not found", 404);
    }

    await Expense.findByIdAndDelete(expenseId);

    await Group.findByIdAndUpdate(expense.groupId, {
      $pull: { expenses: expenseId },
    });

    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  addExpense,
  updateExpense,
  deleteExpense,
};
