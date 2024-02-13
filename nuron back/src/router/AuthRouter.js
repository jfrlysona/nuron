import express from "express";
import {
  loginController,
  registerController,
  resetPasswordController,
} from "../controller/AuthController.js";

export const AuthRouter = express.Router();

AuthRouter.post("/login", loginController);
AuthRouter.post("/register", registerController);
AuthRouter.post("/reset-password", resetPasswordController);
