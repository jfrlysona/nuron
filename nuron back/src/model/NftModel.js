import mongoose, { Schema } from "mongoose";

const nftSchema = new Schema({
  name: String,
  description: String,
  collectionId: { type: Schema.Types.ObjectId, ref: "collections" },
  category: String,
  tags: String,
  authorId: { type: Schema.Types.ObjectId, ref: "users" },
  price: Number,
  createdAt: { type: Date, default: Date.now },
  endingOn: Date,
  image: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
});
export const NftModel = mongoose.model("nfts", nftSchema);
