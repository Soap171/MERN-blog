import express from "express";
import {
  signIn,
  signUp,
  signOut,
  verifyEmail,
  forgetPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.Controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/sign-out", signOut);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
