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
  // cloudinary.uploader.upload(
  //   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  //   { public_id: "olympic_flag" },
  //   function (error, result) {
  //     console.log(result);
  //     console.log("hello");
  //     res.send("Namaste");
  //   }
  // );
  Post.find({})
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong.");
    });
});

uploadImageRouter.post("/", async (req, res) => {
  // const { image, prompt } = req.body;
  // cloudinary.uploader
  //   .upload(img, { public_id: prompt })
  //   .then((response) => {
  //     console.log(response)
  //     Post.create({
  //       prompt,
  //       image: response.url,
  //       date: new Date(),
  //     })
  //       .then((r) => {
  //         console.log(r);
  //         res.status(200).send("Uploaded succesfully");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         res.status(500).json({ error: "something went wrong. in mongodb" });
  //       });
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.sendStatus(500).json({ error: "Something went wrong in cloud." });
  //   });
  try {
    const { image, prompt } = req.body;
    const photoUrl = await cloudinary.uploader.upload(image);

    const newPost = await Post.create({
      prompt,
      image: photoUrl.url,
      date: new Date()
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default uploadImageRouter;
