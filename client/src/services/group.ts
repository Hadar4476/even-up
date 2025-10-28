import { ISearchUsersResponse, UserSearchResult } from "@/types";
import { api } from "./ApiService";

import {
  IGroup,
  IGroupData,
  IGroupWithSettlement,
  ISettlementResult,
} from "@/types/group";

const route = "/group";

export const getAllGroups = async (
  page: number,
  limit: number
): Promise<IGroupData> => {
  return api.get<IGroupData>(`${route}/getAll?page=${page}&limit=${limit}`);
};

export const searchGroups = async (
  query: string,
  page: number,
  limit: number
): Promise<IGroupData> => {
  return api.get<IGroupData>(
    `${route}/searchGroups?query=${query}&page=${page}&limit=${limit}`
  );
};

export const searchUsers = async (
  groupId: IGroup["_id"],
  query: string,
  page: number,
  limit: number
): Promise<ISearchUsersResponse> => {
  return api.get<ISearchUsersResponse>(
    `${route}/searchUsers/${groupId}?query=${query}&page=${page}&limit=${limit}`
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

export const createGroup = async (groupData: FormData): Promise<IGroup> => {
  return api.post<IGroup>(`${route}`, groupData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateGroup = async (
  groupId: IGroup["_id"],
  groupData: FormData
): Promise<IGroup> => {
  return api.put<IGroup>(`${route}/${groupId}`, groupData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteGroup = async (groupId: IGroup["_id"]) => {
  return api.delete(`${route}/${groupId}`);
};
