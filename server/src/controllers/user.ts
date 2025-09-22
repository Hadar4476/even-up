import { Response, NextFunction } from "express";
import { CommonRequest } from "../types";

import User from "../models/user";

import AppError from "../error";

const getUser = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new AppError("Validation failed", 401);
    }

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export default {
  getUser,
};
