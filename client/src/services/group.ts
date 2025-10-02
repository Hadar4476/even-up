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
  return api.get<Promise<{ group: IGroup; settlement: SettlementResult }>>(
    `${route}/${groupId}`
  );
};

export const createGroup = async (
  groupData: IGroupFormData
): Promise<IGroupWithSettlement> => {
  return api.post<Promise<IGroupWithSettlement>>(`${route}`, groupData);
};
