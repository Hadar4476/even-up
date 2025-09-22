import express from "express";

import { validate } from "../middleware/validate";

import checkAuthentication from "../middleware/auth";
import { groupValidation, inviteToGroupValidation } from "../validators/group";

import groupController from "../controllers/group";

const router = express.Router();

router.get("/", checkAuthentication, groupController.getGroups);

router.post(
  "/",
  checkAuthentication,
  groupValidation,
  validate,
  groupController.createGroup
);

router.post(
  "/invite/:groupId",
  checkAuthentication,
  inviteToGroupValidation,
  validate,
  groupController.inviteToGroup
);

router.put(
  "/update/:groupId",
  checkAuthentication,
  groupValidation,
  validate,
  groupController.updateGroup
);

router.delete(
  "/delete/:groupId",
  checkAuthentication,
  groupController.deleteGroup
);

export default router;
