
import express from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import { getChatHistory } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/:roomId", verifyJwt, getChatHistory);

export default router;
