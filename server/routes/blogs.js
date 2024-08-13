import express from "express";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogs.Controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", allBlogs);
router.post("/", verifyToken, createBlog);
router.delete("/:id", verifyToken, deleteBlog);
router.patch("/:id", verifyToken, updateBlog);

export default router;
