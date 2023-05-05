import mongoose from "mongoose";
import Models from "../../models/index.js";
import { constructError, extractErrorMessages } from "../../utils/helpers.js";
import { validationResult } from "express-validator";

const getUserData = async (req, res) => {
  const { id } = req.user;
  if (!mongoose.isValidObjectId(mongoose.Types.ObjectId(id)))
    return res
      .status(400)
      .json({ error: true, message: constructError("id", "invalid") });

  const user = await Models.Users.findOne({
    _id: mongoose.Types.ObjectId(id),
  });

  if (!user) return res.status(404).json({ user: {} });

  return res.status(200).json({ user });
};

const putUpdateUserData = async (req, res, next) => {
  try {
    const errors = validationResult(req.body);

    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ error: true, message: extractErrorMessages(errors.array()) });

    const user = await Models.Users.findById(req.user.id);

    if (!user)
      return res
        .status(404)
        .json({ error: true, message: constructError("user", "not found") });

    for (let key in req.body) user[key] = req.body[key];
    console.log(user);
    await user.save();
    return res
      .status(200)
      .json({ message: "New data was saved successfully!" });
  } catch (e) {
    next(e);
  }
};

const putAddPostToFavourites = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id } = req.user;
    const post = await Models.Posts.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: true,
        message: constructError("Post Id", "Post not found"),
      });
    }

    const user = await Models.Users.updateOne(
      {
        _id: id,
      },
      { $addToSet: { favouritePosts: postId } },
    );

    return res
      .status(200)
      .json({ message: "Post added to favourites successfully" });
  } catch (e) {
    next(e);
  }
};

const getAllFavouritePosts = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await Models.Users.findById(id)
      .populate("favouritePosts")
      .lean();
    return res.status(200).json({
      favouritePosts: user.favouritePosts,
    });
  } catch (e) {
    next(e);
  }
};

const deleteFavouritePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id } = req.user;
    const post = await Models.Posts.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: true,
        message: constructError("Post Id", "Post not found"),
      });
    }

    await Models.Users.updateOne(
      {
        _id: id,
      },
      { $pull: { favouritePosts: postId } },
    );

    return res
      .status(200)
      .json({ message: "Post deleted from favourites successfully" });
  } catch (e) {
    next(e);
  }
};

const putUserImg = async (req, res, next) => {
  const avatar = req.file.originalname;
  const user = await Models.Users.findById(req.user.id);

  if (!user)
    return res.status(404).json({ message: "User not found, please login" });

  user.avatar = avatar;
  await user.save();

  return res.status(200).json({ message: "Image saved successfully" });
};

export default {
  getUserData,
  putUpdateUserData,
  putAddPostToFavourites,
  getAllFavouritePosts,
  deleteFavouritePost,
  putUserImg,
};
