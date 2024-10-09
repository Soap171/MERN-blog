import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchBlogs } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../utils/Loader";
import "./style.css";
import parse from "html-react-parser";
import { format } from "date-fns";
function BlogList({ excludeBlogId }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const searchQuery = queryParams.get("search") || "";
  const navigate = useNavigate();

  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", category],
    queryFn: () => fetchBlogs(category),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    return blogs.filter(
      (blog) =>
        blog._id !== excludeBlogId &&
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, excludeBlogId, searchQuery]);

  // Calculate the blogs to be displayed on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    if (error.response.status === 404) {
      return (
        <div className="container my-5">
          <div className="alert alert-warning" role="alert">
            No blogs found.
          </div>
        </div>
      );
    }

    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {currentBlogs?.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div
              className="card h-100"
              onClick={() => handleCardClick(blog._id)}
            >
              <img
                src={blog.imageUrl}
                className="card-img-top"
                alt={blog.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {highlightText(blog.title, searchQuery)}
                </h5>
                <p className="card-text">
                  {parse(blog.body.substring(0, 400))}
                </p>
                <p className="card-text">{blog.category}</p>
                <p className="card-text">
                  {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
                </p>
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
                  index + 1 === currentPage ? "active" : ""
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
