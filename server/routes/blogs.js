import express from "express";
import { allBlogs } from "../controllers/blogs.Controller.js";
const router = express.Router();

router.get("/", allBlogs);

export default router;
