import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./style.css";

const blogs = [
  {
    id: 1,
    title: "Blog Post 1",
    description: "This is a short description of blog post 1.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Blog Post 2",
    description: "This is a short description of blog post 2.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Blog Post 3",
    description: "This is a short description of blog post 3.",
    image: "https://via.placeholder.com/150",
  },

  {
    id: 1,
    title: "Blog Post 4",
    description: "This is a short description of blog post 1.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Blog Post 5",
    description: "This is a short description of blog post 2.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Blog Post 6",
    description: "This is a short description of blog post 3.",
    image: "https://via.placeholder.com/150",
  },
  // Add more blog posts as needed
];

function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;
  const navigate = useNavigate();

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
          <div className="col-md-4 mb-4" key={blog.id}>
            <div
              className="card h-100"
              onClick={() => handleCardClick(blog.id)}
            >
              <img src={blog.image} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>

                <p className="card-text">{blog.description}</p>
                <a href="#" className="btn btn-primary">
                  Read More
                </a>
              </div>
              <div className="p-2">
                <AiFillEdit size={20} className="icon-hover" />{" "}
                <AiOutlineDelete size={20} className="icon-hover" />
              </div>
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
}

export default BlogList;
