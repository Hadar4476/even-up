import mongoose, { Schema } from "mongoose";
import { IGroupInvitation } from "../types/group-invitation";

const groupInvitationSchema: Schema = new Schema(
  {
    group: {
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

groupInvitationSchema.index({ group: 1, to: 1 }, { unique: true });

const GroupInvitation = mongoose.model<IGroupInvitation>(
  "GroupInvitation",
  groupInvitationSchema
);

export default GroupInvitation;
