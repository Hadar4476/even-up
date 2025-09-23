import { body } from "express-validator";

const isTitle = () =>
  body("title")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 100 })
    .withMessage("Title must be between 1 and 100 characters");

const isDescription = () =>
  body("description")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 1000 })
    .withMessage("Description must be between 1 and 100 characters");

export const groupValidation = [isTitle(), isDescription(), body("img").trim()];

export const inviteToGroupValidation = [body("userId").trim().not().isEmpty()];
