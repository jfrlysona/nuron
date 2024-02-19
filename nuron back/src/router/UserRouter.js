import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/UserController.js";
import { verifyAccess } from "../middleware/AuthMiddleware.js";
import { upload } from "../middleware/UploadMiddleware.js";

export const UserRouter = express.Router();

UserRouter.get("/", getAllUsers);
UserRouter.get("/:id", verifyAccess(["Admin", "User"]), getUserById);
UserRouter.post("/", verifyAccess(["Admin"]), createUser);
UserRouter.put(
  "/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  verifyAccess(["Admin", "User"]),
  updateUser
);
UserRouter.delete("/:id", verifyAccess(["Admin"]), deleteUser);
