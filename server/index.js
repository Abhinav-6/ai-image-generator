import express from "express";
import * as dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Namaste World");
})


const startServer = () => {
  app.listen(3001, () => {
    console.log("Server is running.");
  })
}

startServer();