import { Response, NextFunction } from "express";
import { CommonRequest } from "../types";

import jwt from "jsonwebtoken";
import config from "../config";
import AppError from "../error";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

const checkAuthentication = (
  req: CommonRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new AppError("Authorization header missing", 401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Invalid Authorization header format", 401);
  }

  try {
    const decodedToken = jwt.verify(token, config.TOKEN_SECRET) as DecodedToken;

    req.user = {
      id: decodedToken.userId,
      // Add more properties if needed
    };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new AppError("Token expired", 401));
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid token", 401));
    }

    next(new AppError("Authentication failed", 500));
  }
};

export default checkAuthentication;
