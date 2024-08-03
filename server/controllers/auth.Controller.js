import mongoose from "mongoose";
import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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
  }
};

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User already exists"));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (!newUser) {
      return next(errorHandler(401, "User not created"));
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    const { password: pass, ...rest } = newUser._doc;

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "none",
        maxAge: 3600000 * 5,
      })
      .json(rest);
  } catch (error) {
    next(errorHandler(error));
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token").json({ message: "Sign out successfully" });
  } catch (error) {
    next(errorHandler(error));
  }
};
