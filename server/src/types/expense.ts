import { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  description: string;
  amount: number;
  userId: Schema.Types.ObjectId;
  groupId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
