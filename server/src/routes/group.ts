import express from "express";

import checkAuthentication from "../middleware/auth";

import { upload } from "../utils/fileUpload";

import { validate } from "../middleware/validate";
import {
  getAllGroupsValidation,
  groupValidation,
  searchGroupsValidation,
  searchUsersValidation,
} from "../validators/group";

import groupController from "../controllers/group";

const router = express.Router();

router.get(
  "/getAll",
  checkAuthentication,
  getAllGroupsValidation,
  validate,
  groupController.getAllGroups
);

router.get(
  "/searchGroups",
  checkAuthentication,
  searchGroupsValidation,
  validate,
  groupController.searchGroups
);

router.get(
  "/searchUsers/:groupId",
  checkAuthentication,
  searchUsersValidation,
  validate,
  groupController.searchUsers
);

router.get("/:groupId", checkAuthentication, groupController.getGroup);

router.post(
  "/",
  checkAuthentication,
  upload.single("img"),
  groupValidation,
  validate,
  groupController.createGroup
);

router.post("/settle/:groupId", checkAuthentication, groupController.settleUp);

router.put(
  "/:groupId",
  checkAuthentication,
  upload.single("img"),
  groupValidation,
  validate,
  groupController.updateGroup
);

router.delete("/:groupId", checkAuthentication, groupController.deleteGroup);

export default router;
