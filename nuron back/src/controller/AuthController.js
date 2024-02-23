import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/UserModel.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User is not found!" });
      return;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(403).json({ message: "Password is not correct!" });
      return;
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      res.status(409).json({ message: "User Already Exists" });
      return;
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      email,
      password: hash,
      firstName,
      lastName,
    });
    await newUser.save();
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
