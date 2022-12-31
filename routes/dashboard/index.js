import { Router } from "express";
import Controllers from "../../controllers/index.js";
import isAuth from "../../middlewars/isAuth.js";
import isAdminAuth from "../../middlewars/isAdminAuth.js";
import { body } from "express-validator";

const globalDashboardRouter = Router();

//--------------------------------
// Users
//--------------------------------
const usersRoutes = Router();
usersRoutes.get(
  "/",
  isAuth,
  isAdminAuth,
  Controllers.DashboardControllers.UsersControllers.getAllUsers
);

usersRoutes.put(
  "/upgradeUser/:id",
  isAuth,
  isAdminAuth,
  Controllers.DashboardControllers.UsersControllers.putChangeUserType
);

usersRoutes.delete(
  "/:userId",
  isAuth,
  isAdminAuth,
  Controllers.DashboardControllers.UsersControllers.deleteOneUser
);

//--------------------------------
// Posts Routes
//--------------------------------
const postsRoutes = Router();

postsRoutes.get(
  "/toReview",
  Controllers.DashboardControllers.PostsControllers.getAllPostsToReview
);

postsRoutes.put(
  "/updateStatus/:postId",
  body("newStatus").exists().trim().isString(),
  Controllers.DashboardControllers.PostsControllers.putChangePostStatus
);

postsRoutes.delete(
  "/:id",
  Controllers.DashboardControllers.PostsControllers.deletePost
);

// Attaching to global dashboard routes
globalDashboardRouter.use("/posts", postsRoutes);
globalDashboardRouter.use("/users", usersRoutes);

export default globalDashboardRouter;
