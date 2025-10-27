import { NextFunction, Response } from "express";
import { CommonRequest } from "../types";

import Group from "../models/group";
import GroupInvitation from "../models/group-invitation";
import { GroupInvitationStatus } from "../types/group-invitation";

import AppError from "../error";

const getInvitations = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const total = await GroupInvitation.countDocuments({
      to: userId,
      status: GroupInvitationStatus.PENDING,
    });

    const invitations = await GroupInvitation.find({
      to: userId,
      status: GroupInvitationStatus.PENDING,
    })
      .populate("group", "title")
      .populate("from", "name")
      .sort({ updatedAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit);

    const hasMore = skip + invitations.length < total;

    const pagination = {
      page,
      limit,
      hasMore,
    };

    res.status(200).json({ success: true, data: { invitations, pagination } });
  } catch (error) {
    next(error);
  }
};

const sendInvitations = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId } = req.params;
    const from = req.user?.id;
    const { members } = req.body;

    if (!Array.isArray(members) || members.length === 0) {
      throw new AppError("Members must be a non-empty array", 400);
    }

    const group = await Group.findOne({
      _id: groupId,
      users: from, // Verify user is in the users array
    });

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    // Check for existing invitations for this group and these users
    const existingInvitations = await GroupInvitation.find({
      group: groupId,
      to: { $in: members },
    });

    // Create a Set of existing user IDs for efficient lookup
    const existingUserIds = new Set(
      existingInvitations.map((inv) => inv.to.toString())
    );

    // Filter out users who already have invitations
    const newMembers = members.filter(
      (userId) => !existingUserIds.has(userId.toString())
    );

    if (newMembers.length === 0) {
      res.status(200).json({
        success: true,
        data: [],
        message: "All users already have invitations for this group",
      });

      return;
    }

    const invitationsToCreate = newMembers.map((userId) => ({
      group: groupId,
      status: GroupInvitationStatus.PENDING,
      from,
      to: userId,
    }));

    const createdInvitations = await GroupInvitation.insertMany(
      invitationsToCreate
    );

    res.status(200).json({
      success: true,
      data: createdInvitations,
    });
  } catch (error) {
    next(error);
  }
};

const updateInvitationStatus = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { invitationId } = req.params;
    const { status } = req.body;

    const groupInvitation = await GroupInvitation.findById(invitationId);

    if (!groupInvitation) {
      throw new AppError("Resource not found", 404);
    }

    let data = null;

    if (status === GroupInvitationStatus.ACCEPTED) {
      // Use $addToSet to prevent duplicates and handle race conditions
      const group = await Group.findOneAndUpdate(
        { _id: groupInvitation.group },
        { $addToSet: { users: groupInvitation.to } },
        { new: true }
      )
        .populate("users", "name email")
        .populate("expenses");

      if (!group) {
        throw new AppError("Group not found", 404);
      }

      data = group;
    }

    await GroupInvitation.findByIdAndDelete(invitationId);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export default {
  getInvitations,
  sendInvitations,
  updateInvitationStatus,
};
