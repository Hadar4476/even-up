import { NextFunction, Response } from "express";
import { CommonRequest } from "../types";

import Group from "../models/group";
import GroupInvitation from "../models/group-invitation";
import { GroupInvitationStatus } from "../types/group-invitation";

import AppError from "../error";

const sendInvitation = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { groupId } = req.params;
  const from = req.user?.id;
  const { to } = req.body;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      throw new AppError("Resource not found", 404);
    }

    const newInvitation = new GroupInvitation({
      groupId,
      status: GroupInvitationStatus.PENDING,
      from,
      to,
    });

    const invitation = await newInvitation.save();

    res.status(200).json(invitation);
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

    let responseData = null;

    if (status === GroupInvitationStatus.ACCEPTED) {
      const group = await Group.findById(groupInvitation.groupId);

      if (!group) {
        throw new AppError("Resource not found", 404);
      }

      group.users = [...group.users, groupInvitation.to];
      responseData = await group.save();
    }

    await GroupInvitation.findByIdAndDelete(invitationId);
    res.status(200).json({ responseData });
  } catch (error) {
    next(error);
  }
};

export default {
  sendInvitation,
  updateInvitationStatus,
};
