import express from "express";

import { validate } from "../middleware/validate";

import checkAuthentication from "../middleware/auth";
import {
  createGroupValidation,
  updateGroupValidation,
} from "../validators/group";

import groupController from "../controllers/group";

const router = express.Router();

router.get("/getAll", checkAuthentication, groupController.getAllGroups);

router.get("/:groupId", checkAuthentication, groupController.getGroup);

router.post(
  "/",
  checkAuthentication,
  createGroupValidation,
  validate,
  groupController.createGroup
);

router.post("/settle/:groupId", checkAuthentication, groupController.settleUp);

router.put(
  "/:groupId",
  checkAuthentication,
  updateGroupValidation,
  validate,
  groupController.updateGroup
);

router.delete("/:groupId", checkAuthentication, groupController.deleteGroup);

export default router;
