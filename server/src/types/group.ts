import { Document, Schema } from "mongoose";

export interface IGroup extends Document {
  title: string;
  description: string;
  img?: string;
  users: Schema.Types.ObjectId[];
  expenses: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
