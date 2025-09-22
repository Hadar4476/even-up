import { Response, NextFunction } from "express";
import { CommonRequest } from "../types";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";

import User from "../models/user";

import AppError from "../error";

const login = async (req: CommonRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const errorMessage = "Invalid email or password";

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(errorMessage, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError(errorMessage, 401);
    }

    const userId = user._id?.toString();

    const tokenJsonData = {
      email: user.email,
      userId,
    };

    const tokenSecret = config.TOKEN_SECRET;

    const tokenConfig = {
      expiresIn: "1h",
    };

    const token = jwt.sign(tokenJsonData, tokenSecret, tokenConfig);

    if (token) {
      // Deep copy the user object to ensure no references are passed
      const mappedUser = JSON.parse(JSON.stringify(user.toObject()));

      // Remove the password field from the copied object
      delete mappedUser.password;

      res.status(200).json({ token, user: mappedUser });
    }
  } catch (err) {
    next(err);
  }
};

const register = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const isEmailTaken = await User.findOne({ email });

    if (isEmailTaken) {
      throw new AppError("Email is already taken", 409);
    }

    const user = new User({
      email,
      name,
      password: hashedPassword,
    });

    const result = await user.save();

    if (result) {
      res
        .status(201)
        .json({ message: "User created successfully", userId: result._id });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  login,
  register,
};
