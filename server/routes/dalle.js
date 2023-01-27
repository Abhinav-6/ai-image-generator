import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const dalleRoute = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

dalleRoute.get("/", (req, res) => {
  res.status(200).send("Hello from Dalle");
});

dalleRoute.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createImage({
      prompt,
      n: 2,
      size: "1024x1024",
    });
    res.json(response.data.data);
  } catch (error) {
    res.status(500).send(error?.message | "Something went wrong.");
  }
});

export default dalleRoute;
