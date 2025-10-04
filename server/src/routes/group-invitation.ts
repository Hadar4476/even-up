import express from "express";

import checkAuthentication from "../middleware/auth";

import { validate } from "../middleware/validate";
import {
  sentInvitationValidation,
  updatedInvitationValidation,
} from "../validators/group-invitation";

import groupInvitationController from "../controllers/group-invitation";

const router = express.Router();

router.get(
  "/getAll",
  checkAuthentication,
  groupInvitationController.getInvitations
);

router.post(
  "/send/:groupId",
  checkAuthentication,
  sentInvitationValidation,
  validate,
  groupInvitationController.sendInvitation
);

router.put(
  "/update/:invitationId",
  checkAuthentication,
  updatedInvitationValidation,
  validate,
  groupInvitationController.updateInvitationStatus
);

export default router;
