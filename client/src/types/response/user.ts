import { IUser } from "../user";

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IRegisterResponse {
  message: string;
  userId: string;
}
