import axios from "axios";
import { API_URL } from "../store/authStore";

const API_URL_BLOG = "http://localhost:8000"; // blog based operations

// update user profile
export const updateProfile = async (data) => {
  try {
    const response = await axios.patch(`${API_URL}/update`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//write a blog
export const writeBlog = async (newBlog) => {
  try {
    const response = await axios.post(`${API_URL_BLOG}/api/blogs`, {
      title: newBlog.title,
      body: newBlog.body,
      category: newBlog.category,
      imageUrl: newBlog.imageUrl,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fetch all blogs
export const fetchBlogs = async (category) => {
  try {
    const response = await axios.get(`${API_URL_BLOG}/api/blogs`, {
      params: category ? { category } : {},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// fetch a single blog
export const fetchBlog = async (id) => {
  try {
    const response = await axios.get(`${API_URL_BLOG}/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// fetch user by use id
export const fetchUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL_BLOG}/api/blogs/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//write a comment
export const writeComment = async (id, commentData) => {
  console.log(commentData);
  try {
    const response = await axios.post(
      `${API_URL_BLOG}/api/blogs/comment/${id}`,
      {
        comment: commentData,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete a commnent
export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL_BLOG}/api/blogs/comment/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update a blog
export const updateBlog = async (id, newBlog) => {
  try {
    const response = await axios.put(
      `${API_URL_BLOG}/api/blogs/${id}`,
      newBlog
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete a blog
export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${API_URL_BLOG}/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
