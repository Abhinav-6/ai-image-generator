import express from "express";
import * as dotenv from "dotenv"
import cors from "cors";
import bodyParser from "body-parser";

import dalleRoute from "./routes/dalle.js";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Namaste World");
})

app.use("/v1/create", dalleRoute);

const startServer = () => {
  app.listen(3001, () => {
    console.log("Server is running.");
  })
}

startServer();