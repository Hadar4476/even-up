import { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  description: string;
  amount: number;
  user: Schema.Types.ObjectId;
  group: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
