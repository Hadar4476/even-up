import express from "express";

import { validate } from "../middleware/validate";

import checkAuthentication from "../middleware/auth";
import {
  addExpenseValidation,
  updateExpenseValidation,
} from "../validators/expense";

import expenseController from "../controllers/expense";

const router = express.Router();

router.post(
  "/",
  checkAuthentication,
  addExpenseValidation,
  validate,
  expenseController.addExpense
);

router.put(
  "/update/:expenseId",
  checkAuthentication,
  updateExpenseValidation,
  validate,
  expenseController.updateExpense
);

router.delete(
  "/delete/:expenseId",
  checkAuthentication,
  expenseController.deleteExpense
);

export default router;
