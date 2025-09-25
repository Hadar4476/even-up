import { body } from "express-validator";

import { isEmail, isPassword } from "./common";

export const loginValidation = [isEmail(), isPassword()];

export const registerValidation = [
  body("name").trim().not().isEmpty(),
  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/)
    .withMessage("Phone number must be a valid US number (+1XXXXXXXXXX)"),
  isEmail(),
  isPassword(),
];
