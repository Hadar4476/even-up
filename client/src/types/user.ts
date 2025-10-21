import { IDocument } from "./";

export interface IUser extends IDocument {
  name: string;
  phoneNumber: string;
  email: string;
}

export type IProfileData = Omit<IUser, "_id">;

export type IUserSearchResult = Omit<IUser, "phoneNumber">;
