import express from "express";
import { validate } from "../middleware/validate";

import checkAuthentication from "../middleware/auth";
import {
  sentInvitationValidation,
  updatedInvitationValidation,
} from "../validators/group-invitation";

import groupInvitationController from "../controllers/group-invitation";

const router = express.Router();

router.get("/", checkAuthentication, groupInvitationController.getInvitations);

router.post(
  "/send/:groupId",
  checkAuthentication,
  sentInvitationValidation,
  validate,
  groupInvitationController.sendInvitation
);

router.post(
  "/update/:invitationId",
  checkAuthentication,
  updatedInvitationValidation,
  validate,
  groupInvitationController.updateInvitationStatus
);

export default router;
