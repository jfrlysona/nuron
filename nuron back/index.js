import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { AuthRouter } from "./src/router/AuthRouter.js";
import { UserRouter } from "./src/router/UserRouter.js";
import { NftRouter } from "./src/router/NftRouter.js";
import { CollectionRouter } from "./src/router/CollectionRouter.js";

// const upload = multer({ storage: storage });
const app = express();
const port = process.env.PORT;
const key = process.env.KEY;

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.use("/user", UserRouter);
app.use("/nft", NftRouter);
app.use("/collection", CollectionRouter);
app.use("/", AuthRouter);

mongoose
  .connect(key)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Not Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
