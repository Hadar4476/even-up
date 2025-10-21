import { body } from "express-validator";

import { isEmail, isPassword } from "./common";

export const updateProfileValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+[1-9]\d{1,14}$/)
    .withMessage(
      "Phone number must be in international format (+[country code][number])"
    )
    .isLength({ min: 8, max: 16 })
    .withMessage("Phone number must be between 8-16 characters"),
  isEmail(),
];

export const changePasswordValidation = [
  isPassword("currentPassword"),
  isPassword("newPassword"),
];
