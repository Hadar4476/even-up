import { body } from "express-validator";
import { isPage, isLimit, isSearchQuery } from "./common";

export const getAllGroupsValidation = [isPage(), isLimit()];

export const searchGroupsValidation = [isSearchQuery(), isPage(), isLimit()];

export const searchUsersValidation = [isSearchQuery(), isPage(), isLimit()];

export const groupValidation = [
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
  body("removeImg")
    .optional()
    .isBoolean()
    .withMessage("removeImg must be a boolean")
    .toBoolean(),
];
