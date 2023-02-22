import { Router } from "express";
import Controllers from "../../controllers/index.js";

const router = Router();

router.post("/", Controllers.ContactControllers.postSendContactMessage);

export default router;
