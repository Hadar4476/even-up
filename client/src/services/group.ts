import { api } from "./ApiService";

import {
  IGroup,
  IGroupFormData,
  IGroupWithSettlement,
  ISettlementResult,
} from "@/types/group";

const route = "/group";

export const getAllGroups = async (
  page: number,
  limit: number
): Promise<{ groups: Omit<IGroup, "expenses">[]; total: number }> => {
  return api.get<{ groups: Omit<IGroup, "expenses">[]; total: number }>(
    `${route}/getAll?page=${page}&limit=${limit}`
  );
};

export const searchGroups = async (
  query: string,
  page: number,
  limit: number
): Promise<{ groups: Omit<IGroup, "expenses">[]; total: number }> => {
  return api.get<{ groups: Omit<IGroup, "expenses">[]; total: number }>(
    `${route}/searchGroups?query=${query}&page=${page}&limit=${limit}`
  );
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
