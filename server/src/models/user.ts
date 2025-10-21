import mongoose, { Schema } from "mongoose";

import { IUser } from "../types/user";

const userSchema: Schema = new Schema({
  name: { type: String, required: true, index: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
