import mongoose, { Schema } from "mongoose";

const nftSchema = new Schema({
  name: String,
  description: String,
  collectionId: { type: Schema.Types.ObjectId, ref: "collections" },
  authorId: { type: Schema.Types.ObjectId, ref: "users" },
  likes: { type: Number, default: 0 },
  price: Number,
  createdAt: { type: Date, default: Date.now },
  endsAt: Date,
  image: String,
  views: { type: Number, default: 0 },
  // owners: { type: Number, default: 0 },
});
export const NftModel = mongoose.model("nfts", nftSchema);
