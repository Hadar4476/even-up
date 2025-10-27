import { body, query } from "express-validator";

import { GroupInvitationStatus } from "../types/group-invitation";

export const getAllGroupInvitationsValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),
];

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
