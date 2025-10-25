import { IGroup } from "@/types";
import { api } from "./ApiService";

import {
  IGroupInvitation,
  IGroupInvitationPopulated,
} from "@/types/group-invitation";
import {
  SendInvitationRequest,
  UpdateInvitationStatusRequest,
} from "@/types/request/group-invitation";

const route = "/group-invitation";

export const getInvitations = async (): Promise<
  IGroupInvitationPopulated[]
> => {
  return api.get<IGroupInvitationPopulated[]>(`${route}/getAll`);
};

export const sendInvitation = async ({
  groupId,
  members,
}: SendInvitationRequest): Promise<IGroupInvitation> => {
  return api.post(`${route}/send/${groupId}`, { members });
};

export const updateInvitationStatus = async ({
  invitationId,
  status,
}: UpdateInvitationStatusRequest): Promise<IGroup | null> => {
  return api.put<IGroup | null>(`${route}/update/${invitationId}`, { status });
};
