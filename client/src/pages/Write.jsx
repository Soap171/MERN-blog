import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadBlogImage, deleteBlogImage } from "../services/firebase";
import { writeBlog, updateBlog, fetchBlog } from "../api/api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

function Write() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { data: blog, isLoading: isBlogLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setCategory(blog.category);
      setImageUrl(blog.imageUrl);
      setOldImageUrl(blog.imageUrl); // Store the old image URL
    }
  }, [blog]);

  const mutation = useMutation({
    mutationFn: async (newBlog) => {
      setIsLoading(true);
      if (id) {
        if (imageUrl !== oldImageUrl) {
          // Delete the old image if a new image is uploaded

          await deleteBlogImage(oldImageUrl);
        }
        return updateBlog(id, newBlog);
      } else {
        return writeBlog(newBlog);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      toast.success(
        id ? "Blog updated successfully." : "Blog created successfully."
      );
      setIsLoading(false);
      navigate("/");
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again.");
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      try {
        toast.loading("Uploading image...");
        const url = await uploadBlogImage(file);
        console.log(url, "url of the image");
        setImageUrl(url);
        toast.dismiss();
        toast.success("Image uploaded successfully.");
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

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  if (isBlogLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-md-center">
        <div className="col-md-8">
          <h2 className="mb-4">{id ? "Edit Blog" : "Write a Blog"}</h2>
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
              {imageUrl && (
                <div className="mb-3">
                  <img src={imageUrl} alt="Blog" className="img-fluid" />
                </div>
              )}
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
                value={body}
                onChange={setBody}
                theme="snow"
                placeholder="Write your blog content here..."
                modules={modules}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isLoading}
            >
              {isLoading ? "Publishing..." : id ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Write;
