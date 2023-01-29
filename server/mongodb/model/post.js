import mongoose from "mongoose";

const Post = new mongoose.Schema({
  prompt: { type: String, required: true },
  image: { type: String, required: true },
  date: Date,
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
