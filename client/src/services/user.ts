import { api } from "./ApiService";

import { IUser } from "@/types";

const route = "/user";

export const fetchUser = async (): Promise<IUser> => {
  return api.get<IUser>(`${route}`);
};
