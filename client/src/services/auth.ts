import { api } from "./ApiService";

import {
  IRegisterRequest,
  ILoginRequest,
  ILoginResponse,
  IUser,
} from "@/types";

const route = "/auth";

export const login = async (
  userData: ILoginRequest
): Promise<ILoginResponse> => {
  return api.post<ILoginResponse>(`${route}/login`, userData);
};

export const register = async (
  userData: IRegisterRequest
): Promise<IUser["_id"]> => {
  return api.post<IUser["_id"]>(`${route}/register`, userData);
};
