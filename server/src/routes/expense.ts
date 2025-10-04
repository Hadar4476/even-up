import express from "express";

import checkAuthentication from "../middleware/auth";

import { validate } from "../middleware/validate";
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
  "/:expenseId",
  checkAuthentication,
  updateExpenseValidation,
  validate,
  expenseController.updateExpense
);

router.delete(
  "/:expenseId",
  checkAuthentication,
  expenseController.deleteExpense
);

export default router;
