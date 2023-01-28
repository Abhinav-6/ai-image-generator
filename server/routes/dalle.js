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
  console.log("prompt user",prompt);

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    res.status(200).json({ img: response.data.data[0].url });
  } catch (error) {
    console.log("error ",error)
    console.log("error response",error.response)
    console.log("error response data error",error.response?.data?.error);
    // res.status(500).send(error?.message | "Something went wrong.");
    res.sendStatus(500);
  }
});

export default dalleRoute;
