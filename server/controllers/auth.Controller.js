import mongoose from "mongoose";
import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { createVerifyToken } from "../utils/createVerifyToken.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

export const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ username });

    if (!user) return next(errorHandler(404, "User not found"));

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return next(errorHandler(400, "Invalid password"));

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "none",
      })
      .json(user);
  } catch (error) {
    next(errorHandler(error));
    console.log(error);
  }
};

export const signUp = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name)
      return next(errorHandler(400, "All fields are required"));

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(errorHandler(400, "User already exists"));

    const hashedPassword = await bcrypt.hash(password, 12);
    const Token = createVerifyToken();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken: Token,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id);
    sendVerificationEmail(user.email, user.verificationToken, next);
    const { password: userPassword, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    return next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token").json({ message: "Sign out successfully" });
  } catch (error) {
    next(errorHandler(error));
  }
};

export const verifyEmail = async (req, res, next) => {
  const { code } = req.body;

  if (!code) return next(errorHandler(400, "Verification code is required"));
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) return next(errorHandler(400, "Invalid or expired token"));

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name, next);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    next(errorHandler(error));
  }
};
