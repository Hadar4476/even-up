import apiClient from "@/api-client";

import {
  IUser,
  IRegisterRequest,
  ILoginRequest,
  ILoginResponse,
  IRegisterResponse,
} from "@/types";

const route = "/auth";

export const login = async (
  userData: ILoginRequest
): Promise<ILoginResponse> => {
  const response = await apiClient.post<ILoginResponse>(
    `${route}/login`,
    userData
  );

  return response.data;
};

export const register = async (
  userData: IRegisterRequest
): Promise<IRegisterResponse> => {
  const response = await apiClient.post<IRegisterResponse>(
    `${route}/register`,
    userData
  );

  return response.data;
};
