import express from "express";

import { validate } from "../middleware/validate";
import { loginValidation, registerValidation } from "../validators/auth";

import authController from "../controllers/auth";

const router = express.Router();

router.post("/login", loginValidation, validate, authController.login);

router.post("/register", registerValidation, validate, authController.register);

export default router;
