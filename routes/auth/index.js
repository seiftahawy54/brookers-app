import { Router } from "express";
import { body } from "express-validator";
import AuthControllers from "../../controllers/auth/index.js";
export default Router()
  .post(
    "/register",
    [
      body("fullname").trim().isString().isLength({ min: 3 }),
      body("age").trim().isString().isLength({ min: 2, max: 2 }),
      body("nationalId").trim().isString().isLength({ min: 14, max: 14 }),
      body("password").trim().isString().isLength({ min: 8 }),
      body("confirmPassword").trim().isString(),
      body("username").trim().isString().isLength({ min: 3, max: 30 }),
    ],
    AuthControllers.Register
  )
  .post(
    "/login",
    [
      body("username").trim().isString().isLength({ min: 3, max: 30 }),
      body("password").trim().isString().isLength({ min: 8 }),
    ],
    AuthControllers.Login
  );
