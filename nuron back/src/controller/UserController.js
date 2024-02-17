import { UserModel } from "../model/UserModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const AllUsers = await UserModel.find({});
    res.status(200).json(AllUsers);
  } catch (error) {
    res.status(500).json({ message: "Users are not found" });
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
  const decoded = req.decoded;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  if (decoded.email !== user.email && decoded.role === "User") {
    return res.status(403).send("You don't have access");
  }
  const {
    email,
    firstName,
    lastName,
    role,
    bio,
    gender,
    currency,
    phone,
    location,
    address,
  } = req.body;
  
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user.role = role;
  user.bio = bio;
  user.gender = gender;
  user.currency = currency;
  user.phone = phone;
  user.location = location;
  user.address = address;

  await user.save();
  res.send(user);
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  res.send(user);
};
