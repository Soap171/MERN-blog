import mongoose from "mongoose";
import Blog from "../models/blog.js";
import Comment from "../models/comments.js";
import { errorHandler } from "../utils/error.js";

// view all blogs
export const allBlogs = async (req, res, next) => {
  const { category } = req.query;

  try {
    let blogs;

    if (category) {
      blogs = await Blog.find({ category }).populate("comments");
      if (!blogs.length)
        return next(errorHandler(404, "No blogs found for this category"));
    } else {
      blogs = await Blog.find().populate("comments");
      if (!blogs.length) return next(errorHandler(404, "No blogs found"));
    }

    res.status(200).json(blogs);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

// create a new blogs
export const createBlog = async (req, res, next) => {
  const { userId } = req.userId;
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

// delete a blog
export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.userId;

  if (!id) return next(errorHandler(400, "Blog ID is required"));

  try {
    const blog = await Blog.findById(id);

    if (!blog) return next(errorHandler(404, "Blog not found"));

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog)
      return next(errorHandler(500, "Failed to delete the blog"));

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

//update blog

export const updateBlog = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(errorHandler(400, "Blog ID is required"));

  try {
    const blog = await Blog.findById(id);
    if (!blog) return next(errorHandler(404, "Blog not found"));

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blog._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updateBlog)
      return next(errorHandler(500, "Failed to update the blog"));

    res.status(200).json(updatedBlog);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

// create a comment for a blog
export const createComment = async (req, res, next) => {
  const userId = req.userId;
  const { commentData } = req.body;
  const { id } = req.params;
  console.log(userId);
  console.log(id);
  console.log(commentData);

  if (!id || !userId) {
    return next(errorHandler(404, "Blog ID or user ID not found"));
  }

  if (!commentData) return next(errorHandler(400, "Comment is required"));

  try {
    const newComment = new Comment({
      comment: commentData,
      user: userId,
      blog: id,
    });

    await newComment.save();
    // Add the comment to the blog's comments array
    await Blog.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });

    if (!newComment) return next(errorHandler(400, "Comment not created"));

    res.status(201).json(newComment);
  } catch (error) {
    return next(errorHandler(500, error.message));
    console.log(error.message);
  }
};
