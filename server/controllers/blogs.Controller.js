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

export const createBlog = async (req, res, next) => {
  const { userId } = req.user.userId;
  const { title, body, category } = req.body;

  if (!title || !body || !category) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const newBlog = new Blog({
      title,
      body,
      category,
      user: userId,
    });

    await newBlog.save();

    if (!newBlog) return next(errorHandler(400, "Blog not created"));

    res.status(201).json(newBlog);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
