import axios from "axios";
import { API_URL } from "../store/authStore";

const API_URL_BLOG = "http://localhost:8000";
export const updateProfile = async (data) => {
  try {
    const response = await axios.patch(`${API_URL}/update`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const writeBlog = async (title, body, category, imageUrl) => {
  try {
    const response = await axios.post(`${API_URL_BLOG}/api/blogs`, {
      title,
      body,
      category,
      imageUrl,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBlogs = async (category) => {
  const response = await axios.get(`${API_URL_BLOG}/api/blogs`, {
    params: category ? { category } : {},
  });
  return response.data;
};

export const fetchBlog = async (id) => {
  try {
    const response = await axios.get(`${API_URL_BLOG}/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
