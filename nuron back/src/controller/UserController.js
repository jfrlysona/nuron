import { UserModel } from "../model/UserModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const AllUsers = await UserModel.find({});
    res.status(200).json(AllUsers);
  } catch (error) {
    res.send("Users are not Found!");
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const decoded = req.decoded;
    const user = await UserModel.findById(id);
    if (decoded.email !== user.email && decoded.role === "User") {
      return res.send("you don't have access");
    }
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const newUser = UserModel({ email, password, firstName, lastName });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).json("User is not created!");
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, firstName, lastName, role } = req.body;
  const user = await UserModel.findByIdAndUpdate(id, {
    email,
    password,
    firstName,
    lastName,
    role,
  });
  res.send(user);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  res.send(user);
};
