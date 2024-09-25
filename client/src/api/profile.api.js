import axios from "axios";
import { API_URL } from "../store/authStore";

export const updateProfile = async (data) => {
  try {
    const response = await axios.patch(`${API_URL}/update`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
