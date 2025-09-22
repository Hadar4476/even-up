import { IDocument } from "./common";

export interface IUser extends IDocument {
  name: string;
  email: string;
}

export interface IAuthState {
  isLoggedIn: boolean;
  token: string | null;
  expiryDate: string | null;
  user: IUser | null;
}
