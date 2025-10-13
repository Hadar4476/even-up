import { body } from "express-validator";

export const createGroupValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 1000 })
    .withMessage("Description must be between 1 and 100 characters"),
];

export const updateGroupValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty if provided")
    .isLength({ max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty if provided")
    .isLength({ max: 1000 })
    .withMessage("Description must be between 1 and 100 characters"),
  body("img").optional().trim(),
];

export const inviteToGroupValidation = [body("userId").trim().notEmpty()];
