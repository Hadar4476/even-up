import express from "express";

import checkAuthentication from "../middleware/auth";

import { validate } from "../middleware/validate";
import { expenseValidation } from "../validators/expense";

import expenseController from "../controllers/expense";

const router = express.Router();

router.post(
  "/",
  checkAuthentication,
  expenseValidation,
  validate,
  expenseController.addExpense
);

router.put(
  "/:expenseId",
  checkAuthentication,
  expenseValidation,
  validate,
  expenseController.updateExpense
);

router.delete(
  "/:expenseId",
  checkAuthentication,
  expenseController.deleteExpense
);

export default router;
