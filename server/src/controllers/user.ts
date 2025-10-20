import { Response, NextFunction } from "express";
import { CommonRequest } from "../types";

import bcrypt from "bcryptjs";

import User from "../models/user";

import AppError from "../error";

const getUser = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new AppError("Validation failed", 401);
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { name, email, phoneNumber } = req.body;

    const isEmailTaken = await User.findOne({ email });

    if (isEmailTaken) {
      throw new AppError("Email is already taken", 409);
    }

    const isPhoneNumberTaken = await User.findOne({ phoneNumber });

    if (isPhoneNumberTaken) {
      throw new AppError("Phone number is already taken", 409);
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new AppError("Validation failed", 401);
    }

    user.name = name ?? user.name;
    user.email = name ?? user.email;
    user.phoneNumber = name ?? user.phoneNumber;

    const updatedUser = await user.save();

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("Validation failed", 401);
    }

    user.password = hashedPassword ?? user.password;

    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  getUser,
  updateProfile,
  changePassword,
};
