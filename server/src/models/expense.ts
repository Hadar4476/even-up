import mongoose, { Document, Schema } from "mongoose";

interface IExpense extends Document {
  description: string;
  amount: number;
  userId: Schema.Types.ObjectId;
  groupId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;
