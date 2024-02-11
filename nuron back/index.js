import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
const key = process.env.KEY;

app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  role: { type: String, default: "User" },
});

const UserModel = mongoose.model("users", userSchema);

app.get("/user", async (req, res) => {
  try {
    const AllUsers = await UserModel.find({});
    res.status(200).json(AllUsers);
  } catch (error) {
    res.send("Users are not Found!");
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  res.send(user);
});

// login register
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User is not Found!" });
      return;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(403).json({ message: "Password is not correct!" });
      return;
    }
    const token = jwt.sign({ email: user.email }, "ldldfk/@%$oos", {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      res.status(409).json({ error: "User Already Exists" });
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
    const token = jwt.sign({ email: newUser.email }, "ldldfk/@%$oos", {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.put("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const { email, password, firstName, lastName, role } = req.body;
//   const user = await UserModel.findByIdAndUpdate(id, {
//     email,
//     password,
//     firstName,
//     lastName,
//     role,
//   });
//   res.send(user);
// });

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  res.send(user);
});

mongoose
  .connect(key)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Not Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
