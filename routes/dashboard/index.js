import { Router } from "express";
import Controllers from "../../controllers/index.js";

const globalDashboardRouter = Router();

//--------------------------------
// POSTS
//--------------------------------

const postsRoutes = Router();

postsRoutes
  .get("/toReview", Controllers.DashboardControllers.getAllPostsToReview)
  .put(
    "/updateStatus/:postId",
    Controllers.DashboardControllers.putChangePostStatus
  );

globalDashboardRouter.use("/posts", postsRoutes);

export default globalDashboardRouter;
