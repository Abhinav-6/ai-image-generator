import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import dalleRoute from "./routes/dalle.js";
import uploadImageRouter from "./routes/uploadImage.js";
import imageRouter from "./routes/images.js";
import connect from "./mongodb/connect.js";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Namaste World");
});

app.use("/v1/create", dalleRoute);
app.use("/upload", uploadImageRouter);
app.use("/images", imageRouter);

const startServer = () => {
  app.listen(3001, () => {
    console.log("Server is running.");
  });
};

try {
  connect(process.env.MONGODB_URL);
  startServer();
} catch (error) {
  console.log(error);
}
