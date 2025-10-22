import { api } from "./ApiService";

import { IUser, IProfileData } from "@/types";

const route = "/user";

export const fetchUser = async (): Promise<IUser> => {
  return api.get<IUser>(`${route}`);
};

export const updateProfile = async (
  profileData: IProfileData
): Promise<IUser> => {
  return api.put<IUser>(`${route}/updateProfile`, profileData);
};

export const changePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  return api.put(`${route}/changePassword`, { currentPassword, newPassword });
};
