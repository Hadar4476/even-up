import { IGroup } from "@/types";
import { api } from "./ApiService";

import {
  IGroupInvitation,
  IGroupInvitationPopulated,
  IGroupInvitationsData,
} from "@/types/group-invitation";
import {
  SendInvitationRequest,
  UpdateInvitationStatusRequest,
} from "@/types/request/group-invitation";

const route = "/group-invitation";

export const getInvitations = async (
  page: number,
  limit: number
): Promise<IGroupInvitationsData> => {
  return api.get<IGroupInvitationsData>(
    `${route}/getAll?page=${page}&limit=${limit}`
  );
};

export const sendInvitations = async ({
  groupId,
  members,
}: SendInvitationRequest): Promise<IGroupInvitation[]> => {
  return api.post(`${route}/send/${groupId}`, { members });
};

export const updateInvitationStatus = async ({
  invitationId,
  status,
}: UpdateInvitationStatusRequest): Promise<IGroup | null> => {
  return api.put<IGroup | null>(`${route}/update/${invitationId}`, { status });
};
