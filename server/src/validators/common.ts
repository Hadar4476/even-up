import { body, query } from "express-validator";

export const isEmail = () =>
  body("email").isEmail().withMessage("Must be a valid email address");

export const isPassword = (field: string) =>
  body(field)
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character");

export const isSearchQuery = () =>
  query("query")
    .trim()
    .notEmpty()
    .withMessage("Search query is required")
    .isString()
    .withMessage("Search query must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1 and 100 characters");

export const isPage = () =>
  query("page")
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt();

export const isLimit = () =>
  query("limit")
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt();
