import express from "express";
import {
  getAllBlogs,
  createBlogPost,
  updateBlogPost
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlogPost);
router.put("/:id", updateBlogPost); // ✅ New PUT route

export default router;