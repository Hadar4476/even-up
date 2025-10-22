import express from "express";

import checkAuthentication from "../middleware/auth";

import { validate } from "../middleware/validate";
import {
  updateProfileValidation,
  changePasswordValidation,
  searchUsersValidation,
} from "../validators/user";

import userController from "../controllers/user";

const router = express.Router();

router.get("/", checkAuthentication, userController.getUser);

router.put(
  "/updateProfile",
  checkAuthentication,
  updateProfileValidation,
  validate,
  userController.updateProfile
);

router.put(
  "/changePassword",
  checkAuthentication,
  changePasswordValidation,
  validate,
  userController.changePassword
);

export default router;
