import express from "express";

import checkAuthentication from "../middleware/auth";

import { validate } from "../middleware/validate";
import {
  getAllGroupInvitationsValidation,
  sentInvitationsValidation,
  updatedInvitationValidation,
} from "../validators/group-invitation";

import groupInvitationController from "../controllers/group-invitation";

const router = express.Router();

router.get(
  "/getAll",
  checkAuthentication,
  getAllGroupInvitationsValidation,
  validate,
  groupInvitationController.getInvitations
);

router.post(
  "/send/:groupId",
  checkAuthentication,
  sentInvitationsValidation,
  validate,
  groupInvitationController.sendInvitations
);

router.put(
  "/update/:invitationId",
  checkAuthentication,
  updatedInvitationValidation,
  validate,
  groupInvitationController.updateInvitationStatus
);

export default router;
