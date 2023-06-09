import joi from "joi";
import {
  extractErrorMessages,
  extractErrorMessagesForSchemas,
} from "../../utils/helpers.js";
import { validationResult } from "express-validator";
import Models from "../../models/index.js";

const postCreatePost = async (req, res, next) => {
  const { mainImg, images } = req.files;
  const { price, title, flatSpecs } = req.body;
  const schema = joi.object({
    space: joi.string().trim().min(2).required(),
    flatType: joi.string().trim().equal("single", "double", "villa").required(),
    numberOfRooms: joi.string().trim().min(1).max(2).required(),
  });
  const specsSchema = await schema.validate(flatSpecs);
  const expressErrors = await validationResult(req);

  console.log(specsSchema)
  if (specsSchema?.error) {
    return res.status(400).json({
      error: true,
      message: extractErrorMessagesForSchemas(specsSchema.error.details),
    });
  }

  if (!expressErrors.isEmpty()) {
    return res.status(400).json({
      error: true,
      message: extractErrorMessages(expressErrors.array()),
    });
  }

  let newPost = "";

  try {
    newPost = new Models.Posts({
      mainImg: mainImg[0].filename,
      images: images.map((img) => img.filename),
      price,
      title,
      flatSpecs,
      seller: req.user.id,
    });
    await newPost.save();
  } catch (e) {
    return next(e);
  }
  return res.status(200).json({ post: newPost });
};

const getAllPosts = async (req, res) => {
  let allPosts = await Models.Posts.find({ status: "accepted" }).populate(
    "seller",
  );
  if (!allPosts) allPosts = [];
  return res.status(200).json({ posts: allPosts });
};

const getSinglePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Models.Posts.findById(postId);
  return res.status(200).json({ post });
};

export default {
  getAllPosts,
  postCreatePost,
  getSinglePost
};
