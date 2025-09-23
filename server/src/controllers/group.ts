import { NextFunction, Response } from "express";
import { CommonRequest } from "../types";

import { getGroupSummary } from "../services/balance-calculator";

import Group from "../models/group";
import Expense from "../models/expense";

import AppError from "../error";

// Updated getGroups to include balance information
const getGroups = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  try {
    const groups = await Group.find({
      users: { $in: [userId] },
    })
      .populate("users", "name")
      .populate("expenses");

    // Add balance information for each group
    const groupsWithBalances = groups.length
      ? await Promise.all(
          groups.map(async (group) => {
            if (!group) {
              throw new AppError("Resource not found", 404);
            }

            const summary = await getGroupSummary(group);

            return {
              ...group.toObject(),
              financialSummary: summary,
            };
          })
        )
      : [];

    res.status(200).json({ groups: groupsWithBalances });
  } catch (error) {
    next(error);
  }
};

// Updated settleUp function
const settleUp = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  // const { groupId } = req.params;
  // const { settlements } = req.body; // Array of { from, to, amount }
  // try {
  //   // Verify the group exists and user has access
  //   const group = await Group.findById(groupId);
  //   if (!group) {
  //     throw new AppError("Group not found", 404);
  //   }
  //   if (!group.users.includes(req.user?.id)) {
  //     throw new AppError("Access denied", 403);
  //   }
  //   // Create settlement expenses (negative amounts for the payer)
  //   const settlementExpenses = settlements.map((settlement: any) => ({
  //     description: `Settlement: ${settlement.from} pays ${settlement.to}`,
  //     amount: -settlement.amount, // Negative because it's a payment, not an expense
  //     userId: settlement.from,
  //     groupId: groupId,
  //   }));
  //   await Expense.insertMany(settlementExpenses);
  //   // Get updated balances
  //   const updatedSummary = await getGroupSummary(groupId);
  //   res.status(200).json({
  //     success: true,
  //     message: "Settlements recorded successfully",
  //     summary: updatedSummary,
  //   });
  // } catch (error) {
  //   next(error);
  // }
};

// const getGroups = async (
//   req: CommonRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const userId = req.user?.id;

//   try {
//     const groups = await Group.find({
//       users: { $in: [userId] },
//     })
//       .populate("users", "name")
//       .populate("expenses");

//     res.status(200).json({ groups });
//   } catch (error) {
//     next(error);
//   }
// };

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

    await Group.findByIdAndDelete(groupId);

    res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// const settleUp = async (
//   req: CommonRequest,
//   res: Response,
//   next: NextFunction
// ) => {};

export default {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  settleUp,
};
