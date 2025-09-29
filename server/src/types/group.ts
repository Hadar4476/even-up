import { Document, Schema } from "mongoose";

import { IUser } from "./user";
import { IExpense } from "./expense";

export interface IGroup extends Document {
  title: string;
  description: string;
  img?: string;
  users: Schema.Types.ObjectId[];
  expenses: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IGroupPopulated extends Document {
  title: string;
  description: string;
  img?: string;
  users: IUser[];
  expenses: IExpense[];
  createdAt: Date;
  updatedAt: Date;
}
