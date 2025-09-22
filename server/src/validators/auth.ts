import { body } from "express-validator";

import { isEmail, isPassword } from "./common";

export const loginValidation = [isEmail(), isPassword()];

export const registerValidation = [
  body("name").trim().not().isEmpty(),
  isEmail(),
  isPassword(),
];
