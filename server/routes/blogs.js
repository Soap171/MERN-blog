import express from "express";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  createComment,
  getBlog,
  getUser,
  deleteComment,
} from "../controllers/blogs.Controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// POST CRUD routes
router.get("/", allBlogs);
router.get("/:id", getBlog);
router.get("/user/:id", getUser);
router.post("/", verifyToken, createBlog);
router.delete("/:id", verifyToken, deleteBlog);
router.put("/:id", verifyToken, updateBlog);

// POST Comments routes
router.post("/comment/:id", verifyToken, createComment);
router.delete("/comment/:id", verifyToken, deleteComment);

export default router;
