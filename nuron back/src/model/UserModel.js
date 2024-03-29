import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  role: { type: String, default: "User" },
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "collections" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "nfts" }],
  profileImage: String,
  bannerImage: String,
  bio:String,
  likedNfts: [{ type: mongoose.Schema.Types.ObjectId, ref: "nfts" }],
  gender:  { type: String, default: "I prefer not to say" },
  currency: { type: String, default: "($)usd" },
  phone: { type: String, default: "+994" },
  location: { type: String, default: "Azerbaijan" },
  address: String,
});

export const UserModel = mongoose.model("users", userSchema);
