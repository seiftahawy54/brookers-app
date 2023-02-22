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
import ContactRoutes from "./contact/index.js";

const router = Router();

router
  .use("/auth", AuthRoutes)
  .use("/users", isAuth, UsersRoutes)
  .use("/posts", isAuth, PostsRoutes)
  .use("/search", isAuth, SearchRoutes)
  .use("/wallets", isAuth, WalletsRoutes)
  .use("/chats", isAuth, ChatsRoutes)
  .use("/contact", ContactRoutes)
  .use("/dashboard", isAuth, isAdminAuth, DashboardRoutes);

export default router;
