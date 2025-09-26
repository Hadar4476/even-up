import express from "express";

import { validate } from "../middleware/validate";

import checkAuthentication from "../middleware/auth";
import { groupValidation } from "../validators/group";

import groupController from "../controllers/group";

const router = express.Router();

router.get("/getAll", checkAuthentication, groupController.getAllGroups);

router.get("/:groupId", checkAuthentication, groupController.getGroup);

router.post(
  "/",
  checkAuthentication,
  groupValidation,
  validate,
  groupController.createGroup
);

router.put(
  "/:groupId",
  checkAuthentication,
  groupValidation,
  validate,
  groupController.updateGroup
);

router.delete("/:groupId", checkAuthentication, groupController.deleteGroup);

export default router;
