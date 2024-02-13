import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/UserController.js";
import { verifyAccess } from "../middleware/AuthMiddleware.js";

export const UserRouter = express.Router();

UserRouter.get("", verifyAccess(["Admin"]), getAllUsers);
UserRouter.get("/:id", verifyAccess(["Admin", "User"]), getUserById);
UserRouter.post("/", verifyAccess(["Admin"]), createUser);
UserRouter.put("/:id", verifyAccess(["Admin"]), updateUser);
UserRouter.delete("/:id", verifyAccess(["Admin"]), deleteUser);
