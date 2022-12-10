import { Router } from "express";
import AuthRoutes from "./auth/index.js";
import PostsRoutes from "./posts/index.js";
import UsersRoutes from "./users/index.js";
import SearchRoutes from "./search/index.js";
import DashboardRoutes from "./dashboard/index.js";
import WalletsRoutes from "./wallets/index.js";
import isAuth from "../middlewars/isAuth.js";
import ChatsRoutes from "./chats/index.js";
import isAdminAuth from "../middlewars/isAdminAuth.js";

const router = Router();

router
  .use("/auth", AuthRoutes)
  .use("/users", UsersRoutes)
  .use("/posts", PostsRoutes)
  .use("/search", SearchRoutes)
  .use("/wallets", WalletsRoutes)
  .use("/chats", isAuth, ChatsRoutes)
  .use("/dashboard", isAuth, isAdminAuth, DashboardRoutes);

export default router;
