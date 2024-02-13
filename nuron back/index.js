import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { AuthRouter } from "./src/router/AuthRouter.js";
import { UserRouter } from "./src/router/UserRouter.js";

const app = express();
const port = process.env.PORT;
const key = process.env.KEY;

app.use(express.json());
app.use(cors());
app.use("/user", UserRouter);
app.use("/", AuthRouter);

mongoose
  .connect(key)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Not Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
