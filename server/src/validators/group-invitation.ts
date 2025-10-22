import { body } from "express-validator";

import { GroupInvitationStatus } from "../types/group-invitation";

export const sentInvitationsValidation = [
  body("members")
    .isArray({ min: 1 })
    .withMessage("Members must be a non-empty array"),
  body("members.*")
    .isMongoId()
    .withMessage("Each member must be a valid user ID"),
];

export const updatedInvitationValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Object.values(GroupInvitationStatus))
    .withMessage(
      `Status must be one of: ${Object.values(GroupInvitationStatus).join(
        ", "
      )}`
    ),
];
