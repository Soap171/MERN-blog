import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css"; // Import custom CSS
import BlogList from "../components/BlogList";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../api/profile.api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../utils/Loader";

function Blog() {
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
    console.log(error);
  }

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
            <h6 className="text-muted">{blog.category}</h6>
          </div>

          <div className="col-12">
            <img
              src={blog.image}
              alt={blog.title}
              className="img-fluid mb-4 blog-image"
            />
          </div>
          <div className="col-12">
            <p className="blog-content">{blog.body}</p>
          </div>
        </div>
      </div>
      <BlogList excludeBlogId={id} />
    </>
  );
}

export default Blog;
