import { body } from "express-validator";

import { GroupInvitationStatus } from "../types/group-invitation";

export const sentInvitationValidation = [body("to").trim().not().isEmpty()];

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
