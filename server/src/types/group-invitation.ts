import { Document, Schema } from "mongoose";

export enum GroupInvitationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export interface IGroupInvitation extends Document {
  group: Schema.Types.ObjectId;
  status: GroupInvitationStatus;
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
}
