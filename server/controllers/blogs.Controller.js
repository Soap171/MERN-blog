import mongoose from "mongoose";
import Blog from "../models/blog.js";
import Comment from "../models/comments.js";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.js";

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

export const getBlog = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(errorHandler(400, "Blog ID is required"));

  try {
    const blog = await Blog.findById(id).populate("comments");
    if (!blog) return next(errorHandler(404, "Blog not found"));

    res.status(200).json(blog);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
// create a new blogs
export const createBlog = async (req, res, next) => {
  console.log("inside create blog controller");
  const userId = req.userId;
  console.log(req.userId);

  const { title, body, category, imageUrl } = req.body;
  console.log(req.body);

  if (!title || !body || !category || !imageUrl) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const newBlog = new Blog({
      title,
      body,
      category,
      user: userId,
      imageUrl,
    });

    await newBlog.save();

    if (!newBlog) {
      console.log("blog not created");
      return next(errorHandler(400, "Blog not created"));
    }

    res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    console.log(error);

    //return next(errorHandler(500, error.message));
  }
};

// delete a blog
export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!id) return next(errorHandler(400, "Blog ID is required"));

  try {
    const blog = await Blog.findById(id);

    if (!blog) return next(errorHandler(404, "Blog not found"));
    if (blog.user.toString() !== userId) {
      return next(
        errorHandler(403, "You are not authorized to delete this blog")
      );
    }
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
  const userId = req.userId;
  console.log(userId, "this is the user id");

  if (!id) return next(errorHandler(400, "Blog ID is required"));

  try {
    const blog = await Blog.findById(id);
    if (!blog) return next(errorHandler(404, "Blog not found"));

    if (blog.user.toString() !== userId) {
      console.log(blog.user, userId);
      return next(
        errorHandler(403, "You are not authorized to update this blog")
      );
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blog._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedBlog)
      return next(errorHandler(500, "Failed to update the blog"));

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log(error);
    return next(errorHandler(500, error.message));
  }
};

// create a comment for a blog
export const createComment = async (req, res, next) => {
  const userId = req.userId;
  const { comment } = req.body;
  const { id } = req.params;
  console.log(userId, "this is the user id");
  console.log(id, "this is the blog id");
  console.log(comment, "this is the comment");

  if (!id || !userId) {
    return next(errorHandler(404, "Blog ID or user ID not found"));
  }

  if (!comment) return next(errorHandler(400, "Comment is required"));

  try {
    const newComment = new Comment({
      comment: comment,
      user: userId,
      blog: id,
    });

    await newComment.save();
    // Add the comment to the blog's comments array
    await Blog.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });

    if (!newComment) return next(errorHandler(400, "Comment not created"));

    res.status(201).json({ success: true });
  } catch (error) {
    //return next(errorHandler(500, error.message));
    console.log(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const userId = req.userId;
  const { id } = req.params;
  console.log(id, "this is the comment id");
  console.log(userId, "this is the user id");

  try {
    const comment = await Comment.findById(id);
    console.log(comment.user._id.toString(), "this is the user of the comment");
    if (!comment) return next(errorHandler(404, "Comment not found"));

    if (comment.user._id.toString() !== userId) {
      return next(
        errorHandler(403, "You are not authorized to delete this comment")
      );
    }
    const deletedComment = await Comment.findByIdAndDelete(id);
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error.message));
  }
};

// get user by user id for comments and blogs
export const getUser = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(errorHandler(400, "User ID is required"));

  try {
    const user = await User.findById(id);
    if (!user) return next(errorHandler(404, "User not found"));
    return res.status(200).json(user);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
