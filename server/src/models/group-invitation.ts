import mongoose, { Schema } from "mongoose";
import { IGroupInvitation } from "../types/group-invitation";

const groupInvitationSchema: Schema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    status: { type: String, required: true },
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const GroupInvitation = mongoose.model<IGroupInvitation>(
  "GroupInvitation",
  groupInvitationSchema
);

export default GroupInvitation;
