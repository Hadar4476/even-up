import { IUser } from "./";

export interface IAuthState {
  isLoggedIn: boolean;
  token: string | null;
  expiryDate: string | null;
  user: IUser | null;
}

export interface IRegisterFormData {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
