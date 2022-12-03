import { Router } from "express";
import Controllers from "../../controllers/index.js";
import { body } from "express-validator";
import isAuth from "../../middlewars/isAuth.js";

const router = Router();

router.post(
  "/addTransaction",
  isAuth,
  [
    body("transaction").exists().isObject(),
    body("transaction.transactionType").exists().isString(),
    body("transaction.quantity").exists().isNumeric(),
    body("transaction.to").exists().isString().isLength({ min: 14, max: 14 }),
    body("transaction.from").exists().isString().isLength({ min: 14, max: 14 }),
  ],
  Controllers.WalletsControllers.postTransaction
);

router.get(
  "/currentUser",
  isAuth,
  Controllers.WalletsControllers.getUserWalletData
);

export default router;
