import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}
