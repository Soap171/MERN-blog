import express from "express";
import { verifyToken } from "../utils/verifyToken";
import { allBlogs } from "../controllers/blogs.Controller";
const router = express.Router();

router.get("/", verifyToken, allBlogs);
