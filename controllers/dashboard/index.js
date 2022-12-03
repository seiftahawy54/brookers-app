import { postStatuses } from "../../models/posts.js";
import { constructError } from "../../utils/helpers.js";
import mongoose from "mongoose";
import Models from "../../models/index.js";

const putChangePostStatus = async (req, res) => {
  const { postId } = req.params;
  const { newStatus } = req.body;

  console.log(newStatus);
  if (postStatuses.findIndex((status) => newStatus === status) === -1)
    return res.status(400).json({
      error: true,
      message: constructError("new status", "not correct"),
    });

  if (!mongoose.isValidObjectId(mongoose.Types.ObjectId(postId)))
    return res
      .status(400)
      .json({ error: true, message: constructError("post id", "not correct") });

  const post = await Models.Posts.findOne({
    _id: mongoose.Types.ObjectId(postId),
  });

  if (!post) return res.status(404).json({ message: "Post not found" });

  post.status = newStatus;
  await post.save();
  return res.status(200).json({ message: "Status saved successfully" });
};

const getAllPostsToReview = async (req, res) => {
  const posts = await Models.find({ status: "underReview" });
  if (!posts) return res.status(404).json({ posts: [] });
  return res.status(200).json({
    posts,
  });
};

export default {
  putChangePostStatus,
  getAllPostsToReview,
};
