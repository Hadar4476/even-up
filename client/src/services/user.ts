import apiClient from "@/api-client";

import { IUser } from "@/types";

const route = "/user";

export const fetchUser = async (userId: IUser["_id"]): Promise<IUser> => {
  const response = await apiClient.get<IUser>(`${route}/${userId}`);

  return response.data;
};
