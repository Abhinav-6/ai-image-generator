import express from "express";
import Post from "../mongodb/model/post.js";

const router = express.Router();

router.get("/", (req, res) => {
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

export default router;