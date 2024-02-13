import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  role: { type: String, default: "User" },
});

export const UserModel = mongoose.model("users", userSchema);
