import { IGroup } from "../group";
import { GroupInvitationStatus, IGroupInvitation } from "../group-invitation";
import { IUser } from "../user";

export interface SendInvitationRequest {
  groupId: IGroup["_id"];
  members: IUser["_id"][];
}

export interface UpdateInvitationStatusRequest {
  invitationId: IGroupInvitation["_id"];
  status: GroupInvitationStatus;
}
