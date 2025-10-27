import { IDocument, IUser, IGroup, IPagination } from "./";

export enum GroupInvitationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export interface IGroupInvitation extends IDocument {
  group: IGroup["_id"];
  status: GroupInvitationStatus;
  from: IUser["_id"];
  to: IUser["_id"];
}

export interface IGroupInvitationPopulated extends IDocument {
  group: { _id: IGroup["_id"]; title: string };
  status: GroupInvitationStatus;
  from: { _id: IUser["_id"]; name: string };
  to: IUser["_id"];
}

export interface IGroupInvitationsData {
  invitations: IGroupInvitationPopulated[];
  pagination: IPagination;
}
