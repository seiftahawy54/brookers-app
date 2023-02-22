import { Router } from "express";
import Controllers from "../../controllers/index.js";

const router = Router();

router.post("/:otherUserId", Controllers.ChatControllers.postCreateChat);

router.get("/allChats", Controllers.ChatControllers.getChatForUser);

export default router;
