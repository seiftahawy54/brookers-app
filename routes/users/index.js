import { Router } from "express";
import Controllers from "../../controllers/index.js";
import isAuth from "../../middlewars/isAuth.js";
import { body } from "express-validator";

const router = Router();

//----------------------------
// Settings Routes
//----------------------------

const settingsRoutes = Router();

settingsRoutes.get(
  "/profile",
  isAuth,
  Controllers.UsersControllers.getUserData
);

settingsRoutes.put(
  "/updateData",
  isAuth,
  [
    body("fullname")
      .optional({ nullable: true })
      .trim()
      .isString()
      .isLength({ min: 3 }),
    body("age")
      .optional({ nullable: true })
      .trim()
      .isString()
      .isLength({ min: 2, max: 2 }),
    body("nationalId")
      .optional({ nullable: true })
      .trim()
      .isString()
      .isLength({ min: 14, max: 14 }),
    body("username")
      .optional({ nullable: true })
      .trim()
      .isString()
      .isLength({ min: 3, max: 30 }),
    body("email").optional({ nullable: true }).trim().isString().isEmail(),
  ],
  Controllers.UsersControllers.putUpdateUserData
);

//---------------------------
// Global Users Routes
//---------------------------
router.use("/settings", settingsRoutes);

export default router;
