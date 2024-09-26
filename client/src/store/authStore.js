import { create } from "zustand";
import axios from "axios";

export const API_URL = "http://localhost:8000/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  checkAuthError: null,

  signUp: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/sign-up`, {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || "Error Signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/sign-in`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Error Logging in",
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/sign-out`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        error: error.message || "Error Logging out",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.message || "Error Verifying Email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, checkAuthError: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isCheckingAuth: false,
        checkAuthError: error.message,
        isAuthenticated: false,
      });
    }
  },

  googleAuth: async (name, email, profileUrl) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/google-auth`, {
        name,
        email,
        googlePhotoUrl: profileUrl,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Error Logging in",
      });
      throw error;
    }
  },

  passwordForget: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  passwordReset: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  updateUser: (userData) => {
    set({ user: userData });
  },
}));
