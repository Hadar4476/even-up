import { IDocument } from "./";

export interface IUser extends IDocument {
  name: string;
  phoneNumber: string;
  email: string;
}
