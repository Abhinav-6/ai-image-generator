import express, { response } from "express";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { config } from "dotenv";
import Post from "../mongodb/model/post.js";

config();

cloudinary.config({
  cloud_name: "dwufa1k9r",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageRouter = express.Router();

uploadImageRouter.get("/", (req, res) => {
  res.send("Nothing to see here.");
});

uploadImageRouter.post("/", async (req, res) => {
  try {
    const { image, prompt } = req.body;
    const photoUrl = await cloudinary.uploader.upload(image);

    const newPost = await Post.create({
      prompt,
      image: photoUrl.url,
      date: new Date(),
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to create a post, please try again",
      });
  }
});

export default uploadImageRouter;
