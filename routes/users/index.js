import { Router } from "express";
import isAdminAuth from "../../middlewars/isAdminAuth.js";
import isAuth from "../../middlewars/isAuth.js";
import Controllers from "../../controllers/index.js";

const router = Router();

router.get("/", isAuth, isAdminAuth, Controllers.UsersControllers.getAllUsers);

router.delete(
  "/:userId",
  isAuth,
  isAdminAuth,
  Controllers.UsersControllers.deleteOneUser
);

export default router;
