import { Router } from "express";
import SearchControllers from "../../controllers/index.js";
import isAuth from "../../middlewars/isAuth.js";

const router = Router();

router.get("/", isAuth, SearchControllers.SearchControllers.getSearch);

export default router;
