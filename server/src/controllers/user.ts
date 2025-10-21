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

    const isEmailTaken = await User.findOne({ email, _id: { $ne: userId } });

    if (isEmailTaken) {
      throw new AppError("Email is already taken", 409);
    }

    const isPhoneNumberTaken = await User.findOne({
      phoneNumber,
      _id: { $ne: userId },
    });

    if (isPhoneNumberTaken) {
      throw new AppError("Phone number is already taken", 409);
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new AppError("Validation failed", 401);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phoneNumber = phoneNumber ?? user.phoneNumber;

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
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new AppError("Current and new password are required", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("Validation failed", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect", 401);
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new AppError(
        "New password must be different from current password",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword ?? user.password;

    await user.save();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

const searchUsers = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const query = req.query.query as string;

    const searchRegex = new RegExp(query, "i");

    const users = await User.find({
      _id: { $ne: userId },
      $or: [{ name: searchRegex }, { email: searchRegex }],
    })
      .select("-password -phoneNumber")
      .limit(50);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export default {
  getUser,
  updateProfile,
  changePassword,
  searchUsers,
};
