import express from "express";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  createComment,
  getBlog,
  getUser,
} from "../controllers/blogs.Controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// POST CRUD routes
router.get("/", allBlogs);
router.get("/:id", getBlog);
router.get("/user/:id", getUser);
router.post("/", verifyToken, createBlog);
router.delete("/:id", verifyToken, deleteBlog);
router.patch("/:id", verifyToken, updateBlog);

// POST Comments routes
router.post("/:id", verifyToken, createComment);

export default router;
