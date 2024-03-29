import express from "express";
import {
  createNft,
  deleteNft,
  getAllNft,
  getNftById,
  updateNft,
} from "../controller/NftController.js";
import { verifyAccess } from "../middleware/AuthMiddleware.js";
import { upload } from "../middleware/UploadMiddleware.js";

export const NftRouter = express.Router();

NftRouter.get("", getAllNft);
NftRouter.get("/:id", getNftById);
NftRouter.post(
  "/",
  verifyAccess(["Admin", "User"]),
  upload.single("image"),
  createNft
);
NftRouter.put("/:id", verifyAccess(["Admin", "User"]), updateNft);
NftRouter.delete("/:id", verifyAccess(["Admin", "User"]), deleteNft);
