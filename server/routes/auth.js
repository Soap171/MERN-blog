import express from "express";
import {
  signIn,
  signUp,
  signOut,
  verifyEmail,
} from "../controllers/auth.Controller.js";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/sign-out", signOut);
router.post("/verify-email", verifyEmail);
export default router;
