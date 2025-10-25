import mongoose, { Schema } from "mongoose";

import { IExpense } from "../types/expense";

const expenseSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;
