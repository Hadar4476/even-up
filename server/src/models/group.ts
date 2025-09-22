import mongoose, { Document, Schema } from "mongoose";

interface IGroup extends Document {
  title: string;
  description: string;
  img?: string;
  users: Schema.Types.ObjectId[];
  expenses: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

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

const Group = mongoose.model<IGroup>("Group", groupSchema);

export default Group;
