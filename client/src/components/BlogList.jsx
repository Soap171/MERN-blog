import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchBlogs } from "../api/profile.api";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Loader from "../utils/Loader";
import "./style.css";

function BlogList() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", category],
    queryFn: () => fetchBlogs(category),
  });
  console.log(blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    if (error.response.status === 404) {
      return (
        <div className="container my-5">
          <div className="alert alert-warning" role="alert">
            No blogs found for the selected category.
          </div>
        </div>
      );
    }

    return <div>Error: {error.message}</div>;
  }

  // Calculate the blogs to be displayed on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate the total number of pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="container my-5">
      <div className="row">
        {currentBlogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div
              className="card h-100"
              onClick={() => handleCardClick(blog._id)}
            >
              <img src={blog.image} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.body}</p>
                <p className="card-text">{blog.category}</p>
              </div>
              <div className="p-2">
                <AiFillEdit size={20} className="icon-hover" />{" "}
                <AiOutlineDelete size={20} className="icon-hover" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentBlogs.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handleClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default BlogList;
