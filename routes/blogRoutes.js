import express from "express";
import { getAllBlogs, createBlogPost } from "../controllers/blogController.js";

const router = express.Router();

// GET /api/blogs
router.get("/", (req, res, next) => {
  console.log("📡 Route: GET /api/blogs");
  getAllBlogs(req, res, next);
});

// POST /api/blogs
router.post("/", (req, res, next) => {
  console.log("🚀 Route: POST /api/blogs");
  createBlogPost(req, res, next);
});

export default router;