import { Response, NextFunction } from "express";
import { CommonRequest } from "../types";

import { validationResult } from "express-validator";
import AppError from "../error";
import { deleteFile } from "../utils/fileUpload";

export const validate = (
  req: CommonRequest,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorDetails = errors.array();

    if (req.file) {
      deleteFile(req.file.filename);
    }

    next(new AppError("Validation failed", 422, errorDetails));
    return;
  }

  next();
};
