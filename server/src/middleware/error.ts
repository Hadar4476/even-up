import { Response, NextFunction } from "express";
import { CommonRequest } from "../types";
import multer from "multer";

import AppError from "../error";
import logger from "../logs/logger";

const errorHandler = (
  err: Error,
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let details = null;

  const isMulterError = err instanceof multer.MulterError;

  if (err instanceof AppError || isMulterError) {
    statusCode = isMulterError ? 400 : err.statusCode;
    message = err.message;
    details = !isMulterError && err.details;
  }

  logger.error({
    message,
    meta: { error: err, url: req.url, method: req.method },
  });

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    details,
  });
};

export default errorHandler;
