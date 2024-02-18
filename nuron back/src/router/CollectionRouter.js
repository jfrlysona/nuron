import express from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
} from "../controller/CollectionController.js";
import { verifyAccess } from "../middleware/AuthMiddleware.js";
import { upload } from "../middleware/UploadMiddleware.js";

export const CollectionRouter = express.Router();

CollectionRouter.get("", getAllCollections);
CollectionRouter.get("/:id", getCollectionById);
CollectionRouter.post(
  "/",
  verifyAccess(["Admin", "User"]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  createCollection
);
CollectionRouter.put("/:id", verifyAccess(["Admin", "User"]), updateCollection);
CollectionRouter.delete(
  "/:id",
  verifyAccess(["Admin", "User"]),
  deleteCollection
);
