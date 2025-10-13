import { api } from "./ApiService";

import {
  IGroup,
  IGroupFormData,
  IGroupWithSettlement,
  ISettlementResult,
} from "@/types/group";

const route = "/group";

export const getAllGroups = async (): Promise<Omit<IGroup, "expenses">[]> => {
  return api.get<Omit<IGroup, "expenses">[]>(`${route}/getAll`);
};

export const getGroup = async (
  groupId: IGroup["_id"]
): Promise<IGroupWithSettlement> => {
  return api.get<{ group: IGroup; settlementResult: ISettlementResult }>(
    `${route}/${groupId}`
  );
};

export const settleUp = async (groupId: IGroup["img"]) => {
  return api.post(`${route}/settle/${groupId}`);
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
