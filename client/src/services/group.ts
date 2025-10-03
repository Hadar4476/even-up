import { api } from "./ApiService";

import {
  IGroup,
  IGroupFormData,
  IGroupWithSettlement,
  SettlementResult,
} from "@/types/group";

const route = "/group";

export const getAllGroups = async (): Promise<IGroup[]> => {
  return api.get<IGroup[]>(`${route}/getAll`);
};

export const getGroup = async (
  groupId: IGroup["_id"]
): Promise<IGroupWithSettlement> => {
  return api.get<{ group: IGroup; settlement: SettlementResult }>(
    `${route}/${groupId}`
  );
};

export const createGroup = async (
  groupData: IGroupFormData
): Promise<IGroupWithSettlement> => {
  return api.post<IGroupWithSettlement>(`${route}`, groupData);
};

export const updateGroup = async ({
  groupId,
  ...groupData
}: {
  groupId: IGroup["_id"];
} & IGroupFormData): Promise<IGroup> => {
  return api.put<IGroup>(`${route}/${groupId}`, groupData);
};

export const deleteGroup = async (groupId: IGroup["_id"]) => {
  return api.delete(`${route}/${groupId}`);
};
