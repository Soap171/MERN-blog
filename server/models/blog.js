import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50,
    },
    body: {
      type: String,
      required: true,
      min: 3,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Technology",
        "Health",
        "Lifestyle",
        "Education",
        "Finance",
        "Travel",
      ],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
