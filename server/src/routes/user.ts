import express from "express";

import userController from "../controllers/user";
import checkAuthentication from "../middleware/auth";

const router = express.Router();

router.get("/:userId", checkAuthentication, userController.getUser);

export default router;
