import express from "express";
import { chatController, fetchChatHistory } from "../controllers/chatController.js";

const router = express.Router();

// User sends a new message -> AI responds and stores in DB
router.post("/", chatController);

// Fetch chat history
router.get("/history", fetchChatHistory);

export default router;