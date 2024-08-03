import mongoose from "mongoose";
import Blog from "../models/blog.js";
import { errorHandler } from "../utils/error.js";

export const allBlogs = async (req, res, next) => {
  const { category } = req.query;

  try {
    let blogs;

    if (category) {
      blogs = await Blog.find({ category });
      if (!blogs.length)
        return next(errorHandler(404, "No blogs found for this category"));
    } else {
      blogs = await Blog.find();
      if (!blogs.length) return next(errorHandler(404, "No blogs found"));
    }

    res.status(200).json(blogs);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
