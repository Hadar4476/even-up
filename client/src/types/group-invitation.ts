import { IDocument, IUser, IGroup } from "./";

export enum GroupInvitationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export interface IGroupInvitation extends IDocument {
  groupId: IGroup["_id"];
  status: GroupInvitationStatus;
  from: IUser["_id"];
  to: IUser["_id"];
}
