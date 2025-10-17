import mongoose, { Schema } from "mongoose";

import { IGroup } from "../types/group";

const groupSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    expenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Expense",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

groupSchema.index({ title: "text" });

const Group = mongoose.model<IGroup>("Group", groupSchema);

export default Group;
