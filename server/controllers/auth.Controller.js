import bcrypt from "bcrypt";
import dotenv from "dotenv";
import crypto from "crypto";
// package imports

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { createVerifyToken } from "../utils/createVerifyToken.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../mailtrap/email.js";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.js";
//local imports

dotenv.config();

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) return next(errorHandler(404, "User not found"));

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return next(errorHandler(400, "Invalid password"));

    if (user.isVerified === false)
      return next(errorHandler(400, "Email not verified"));

    user.lastLogin = Date.now();
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    const { password: pass, ...rest } = user._doc;

    res.status(201).json({
      success: true,
      message: "user logged in successfully",
      user: rest,
    });
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
    const { password: pass, ...rest } = user._doc;

    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: rest,
    });
  } catch (error) {
    return next(errorHandler(error));
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token").json({ message: "Sign out successfully" });
  } catch (error) {
    next(errorHandler(error));
    console.log(error);
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
    const { password: pass, ...rest } = user._doc;

    await sendWelcomeEmail(user.email, user.name, next);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      rest,
    });
  } catch (error) {
    next(errorHandler(error));
    console.log(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(errorHandler(400, "Email is required"));

  try {
    const user = await User.findOne({ email });

    if (!user) return next(errorHandler(404, "User not found"));

    //generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
      next
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    next(errorHandler(error));
    console.log(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) return next(errorHandler(400, "Password is required"));

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) return next(errorHandler(400, "Invalid or expired token"));

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email, next);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(errorHandler(error));
    console.log(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return next(errorHandler(404, "User not found"));
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return next(errorHandler(error));
  }
};

export const updateProfile = async (req, res, next) => {
  const { name, bio, location, phone, profilePicture, email } = req.body;

  if (!name && !bio && !location && !phone && !profilePicture && !email)
    return next(errorHandler(400, "At least one field is required"));

  try {
    const user = await User.findById(req.userId);
    if (!user) return next(errorHandler(404, "User not found"));

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (bio) updatedFields.bio = bio;
    if (location) updatedFields.location = location;
    if (phone) updatedFields.phone = phone;
    if (profilePicture) updatedFields.profilePicture = profilePicture;
    if (email) updatedFields.email = email;

    await user.updateOne(updatedFields);

    return res
      .status(200)
      .json({ success: true, user: { ...user._doc, ...updatedFields } });
  } catch (error) {
    next(errorHandler(error));
    console.log(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      generateTokenAndSetCookie(res, user._id);
      const { password, ...rest } = user._doc;

      res.status(201).json({
        success: true,
        user: rest,
      });
    } else {
      const randomPassword = Math.random().toString(36).slice(-8);

      const hashedPassowrd = bcrypt.hashSync(randomPassword, 10);

      const newUser = new User({
        name:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassowrd,
        profilePicture: googlePhotoUrl,
        isVerified: true,
      });

      await newUser.save();

      generateTokenAndSetCookie(res, newUser._id);
      const { password, ...rest } = newUser._doc;

      res.status(201).json({
        success: true,
        message: "user created successfully",
        user: rest,
      });
    }
  } catch (error) {
    return next(errorHandler(error));
  }
};
