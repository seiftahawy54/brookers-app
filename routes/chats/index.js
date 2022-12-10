import { Router } from "express";
import Controllers from "../../controllers/index.js";

const router = Router();

router.get("/", Controllers.ChatControllers.getChatData);

router.post("/:otherUserId", Controllers.ChatControllers.postCreateChat);

export default router;
