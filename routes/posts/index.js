import { Router } from "express";
import Controllers from "../../controllers/index.js";
import isAuth from "../../middlewars/isAuth.js";
import upload from "../../middlewars/upload.js";
import { body } from "express-validator";

export default Router()
  .get("/", isAuth, Controllers.PostsControllers.getAllPosts)
  .post(
    "/",
    isAuth,
    upload.fields([
      {
        name: "mainImg",
        maxCount: "1",
      },
      {
        name: "images",
      },
    ]),
    body("title").exists().trim().isString().isLength({ min: 15, max: 60 }),
    body("price").exists().trim().isString().isLength({ min: 2, max: 12 }),
    body("flatSpecs").exists().isObject(),
    Controllers.PostsControllers.postCreatePost
  )
  .get("/:postId", Controllers.PostsControllers.getSinglePost);
