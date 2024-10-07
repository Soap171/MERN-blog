import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadBlogImage } from "../services/firebase";
import { writeBlog } from "../api/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Write() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newBlog) =>
      writeBlog(
        newBlog.title,
        newBlog.body,
        newBlog.category,
        newBlog.imageUrl,
        setIsLoading(true)
      ),

    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      toast.success("Blog created successfully.");
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      try {
        const url = await uploadBlogImage(file);
        setImageUrl(url);
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body || !category || !imageUrl) {
      toast.error("All fields are required.");
      return;
    }

    const newBlog = {
      title,
      body,
      category,
      imageUrl,
    };

    mutation.mutate(newBlog);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-md-center">
        <div className="col-md-8">
          <h2 className="mb-4">Write a Blog</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="formTitle"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formCategory" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="formCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="formImage" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="formImage"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formContent" className="form-label">
                Content
              </label>
              <ReactQuill
                value={body}
                onChange={setBody}
                theme="snow"
                placeholder="Write your blog content here..."
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Write;
