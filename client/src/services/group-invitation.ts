import { IGroupInvitation } from "@/types/group-invitation";
import { api } from "./ApiService";
import {
  SendInvitationRequest,
  UpdateInvitationStatusRequest,
} from "@/types/request/group-invitation";

const route = "/group-invitation";

export const getInvitations = async (): Promise<IGroupInvitation[]> => {
  return api.get<IGroupInvitation[]>(`${route}/getAll`);
};

export const sendInvitation = async ({
  groupId,
  to,
}: SendInvitationRequest): Promise<IGroupInvitation> => {
  return api.post(`${route}/send/${groupId}`, { to });
};

export const updateInvitationStatus = async ({
  invitationId,
  status,
}: UpdateInvitationStatusRequest) => {
  return api.put(`${route}/update/${invitationId}`, { status });
};
