import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadBlogImage, deleteBlogImage } from "../services/firebase";
import { writeBlog } from "../api/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      console.log("Update blog");
    }
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
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formContent" className="form-label">
                Content
              </label>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                placeholder="Write your blog content here..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Write;
