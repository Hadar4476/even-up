import { IGroup } from "../group";
import { GroupInvitationStatus, IGroupInvitation } from "../group-invitation";
import { IUser } from "../user";

export interface SendInvitationRequest {
  groupId: IGroup["_id"];
  to: IUser["_id"];
}

export interface UpdateInvitationStatusRequest {
  invitationId: IGroupInvitation["_id"];
  status: GroupInvitationStatus;
}
