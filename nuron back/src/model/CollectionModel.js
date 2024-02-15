import mongoose, { Schema } from "mongoose";

const collectionSchema = new Schema({
  name: String,
  image: String,
  bannerImage: String,
  description: String,
  nfts: [{ type: Schema.Types.ObjectId, ref: "nfts" }],
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
});

export const CollectionModel = mongoose.model("collections", collectionSchema);
