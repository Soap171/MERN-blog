import mongoose from "mongoose";
import Blog from "../models/blog.js";
import { errorHandler } from "../utils/error.js";

export const allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return next(errorHandler(404, "No blogs found"));
    }
    res.status(200).json(blogs);
  } catch (error) {
    return next(errorHandler(500, "Server error"));
  }
};
