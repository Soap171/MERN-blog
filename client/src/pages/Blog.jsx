import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css"; // Import custom CSS
import BlogList from "../components/BlogList";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

function Blog() {
  const blog = {
    id: 1,
    title: "Blog Post 1",
    description: "This is a short description of blog post 1.",
    content: "Full content of blog post 1.",
    image: "https://via.placeholder.com/150",
  };

  return (
    <>
      <div className="container my-5 blog-container">
        <div className="row">
          <div className="col-12">
            <div className="p-2">
              <AiFillEdit size={20} className="icon-hover" />{" "}
              <AiOutlineDelete size={20} className="icon-hover" />
            </div>
            <h2 className="blog-title">{blog.title}</h2>
          </div>

          <div className="col-12">
            <img
              src={blog.image}
              alt={blog.title}
              className="img-fluid mb-4 blog-image"
            />
          </div>
          <div className="col-12">
            <p className="blog-content">{blog.content}</p>
          </div>
        </div>
      </div>
      <BlogList />
    </>
  );
}

export default Blog;
