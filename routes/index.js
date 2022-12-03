import { Router } from "express";
import AuthRoutes from "./auth/index.js";
import PostsRoutes from "./posts/index.js";
import UsersRoutes from "./users/index.js";
import SearchRoutes from "./search/index.js";
import DashboardRoutes from "./dashboard/index.js";
import isAuth from "../middlewars/isAuth.js";
import isAdminAuth from "../middlewars/isAdminAuth.js";

const router = Router();

try {
  router
    .use("/auth", AuthRoutes)
    .use("/posts", PostsRoutes)
    .use("/users", UsersRoutes)
    .use("/search", SearchRoutes)
    .use("/dashboard", isAuth, isAdminAuth, DashboardRoutes);
} catch (e) {
  throw new Error(e.message);
}

export default router;
