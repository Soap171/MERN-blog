import express from "express";
import {
  allBlogs,
  createBlog,
  deleteBlog,
} from "../controllers/blogs.Controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", allBlogs);
router.post("/", verifyToken, createBlog);
router.delete("/:id", verifyToken, deleteBlog);

export default router;
