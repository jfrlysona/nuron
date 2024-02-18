import mongoose, { Schema } from "mongoose";

const nftSchema = new Schema({
  name: String,
  description: String,
  collectionId: { type: Schema.Types.ObjectId, ref: "collections" },
  category:String,
  tags:Array,
  authorId: { type: Schema.Types.ObjectId, ref: "users" },
  price: Number,
  createdAt: { type: Date, default: Date.now },
  endingOn: Date,
  image: String,
  likes: { type: Number, default: 0 },
});
export const NftModel = mongoose.model("nfts", nftSchema);
