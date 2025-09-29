import { body } from "express-validator";

export const addExpenseValidation = [
  body("groupId").trim().notEmpty(),
  body("description")
    .trim()
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage("Description must be between 1 and 100 characters"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 0.01, max: 999999.99 })
    .withMessage("Amount must be between 0.01 and 999,999.99")
    .custom((value) => {
      // Ensure no more than 2 decimal places for currency
      if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
        throw new Error("Amount can have at most 2 decimal places");
      }
      return true;
    }),
];

export const updateExpenseValidation = [
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty if provided")
    .isLength({ max: 100 })
    .withMessage("Description must be between 1 and 100 characters"),
  body("amount")
    .optional()
    .notEmpty()
    .withMessage("Amount cannot be empty if provided")
    .isFloat({ min: 0.01, max: 999999.99 })
    .withMessage("Amount must be between 0.01 and 999,999.99")
    .custom((value) => {
      // Ensure no more than 2 decimal places for currency
      if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
        throw new Error("Amount can have at most 2 decimal places");
      }
      return true;
    }),
];
