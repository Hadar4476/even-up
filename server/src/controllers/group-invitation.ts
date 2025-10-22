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

    const invitations = await GroupInvitation.find({
      to: userId,
      status: GroupInvitationStatus.PENDING,
    })
      .populate("groupId", "title")
      .populate("from", "name")
      .sort({ updatedAt: -1, _id: -1 });

    res.status(200).json({ success: true, data: invitations });
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

    const group = await Group.findById(groupId);

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    const invitationsToCreate = members.map((userId) => ({
      groupId,
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
        { _id: groupInvitation.groupId },
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
