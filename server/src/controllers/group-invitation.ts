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
  const userId = req.user?.id;

  try {
    const invitations = await GroupInvitation.find({
      to: userId,
      status: GroupInvitationStatus.PENDING,
    })
      .populate("groupId", "title")
      .populate("from", "name");

    res.status(200).json({ success: true, data: { invitations } });
  } catch (error) {
    next(error);
  }
};

const sendInvitation = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { groupId } = req.params;
  const from = req.user?.id;
  const { to } = req.body;

  try {
    // Checking if invitation is already established
    const existingInvitation = await GroupInvitation.findOne({
      groupId,
      $or: [
        { from, to },
        { from: to, to: from },
      ],
      status: GroupInvitationStatus.PENDING,
    });

    if (existingInvitation) {
      throw new AppError("Invitation already exists", 409);
    }

    const group = await Group.findById(groupId);

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    const isUserInGroup = group.users.includes(to);

    if (isUserInGroup) {
      throw new AppError("User is already in group", 409);
    }

    const newInvitation = new GroupInvitation({
      groupId,
      status: GroupInvitationStatus.PENDING,
      from,
      to,
    });

    const invitation = await newInvitation.save();

    res.status(200).json({ success: true, data: { invitation } });
  } catch (error) {
    next(error);
  }
};

const updateInvitationStatus = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { invitationId } = req.params;
  const { status } = req.body;

  try {
    const groupInvitation = await GroupInvitation.findById(invitationId);

    if (!groupInvitation) {
      throw new AppError("Resource not found", 404);
    }

    let data = null;

    if (status === GroupInvitationStatus.ACCEPTED) {
      // Use $addToSet to prevent duplicates and handle race conditions
      const group = await Group.findByIdAndUpdate(
        groupInvitation.groupId,
        { $addToSet: { users: groupInvitation.to } },
        { new: true }
      );

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
  sendInvitation,
  updateInvitationStatus,
};
