import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css"; // Import custom CSS
import BlogList from "../components/BlogList";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import {
  fetchBlog,
  fetchUser,
  writeComment,
  deleteComment,
  deleteBlog,
} from "../api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../utils/Loader";
import { useAuthStore } from "../store/authStore";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteBlogImage } from "../services/firebase";
import DeleteModal from "../components/DeleteModal";

function Blog() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [commentText, setCommentText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id),
  });

  const mutation = useMutation({
    mutationFn: (newComment) => writeComment(id, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", id]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", id]);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async () => {
      if (blog.imageUrl) {
        await deleteBlogImage(blog.imageUrl);
      }
      return deleteBlog(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      queryClient.invalidateQueries(["blog", id]);
      navigate("/");
      toast.success("Blog deleted successfully.");
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again.");
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(commentText);
    setCommentText("");
  };

  const handleEditClick = () => {
    navigate(`/write/${id}`);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteBlogMutation.mutate();
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="container my-5 blog-container">
      <div className="row">
        <div className="col-12">
          {user && blog.user === user._id && (
            <div className="d-flex justify-content-end mb-2">
              <AiFillEdit
                size={20}
                className="icon-hover me-2"
                onClick={handleEditClick}
              />
              <AiOutlineDelete
                size={20}
                className="icon-hover"
                onClick={handleDelete}
              />
            </div>
          )}
          <h2 className="blog-title">{blog.title}</h2>
          <h6 className="text-muted">{blog.category}</h6>
        </div>

        <div className="col-12">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="img-fluid mb-4 blog-image"
          />
        </div>
        <div className="col-12">
          <p className="blog-content">{parse(blog.body)}</p>
        </div>
      </div>
      {/* Display comments */}
      {blog.comments && blog.comments.length > 0 && (
        <div className="comments-section mt-4">
          <h6>Comments:</h6>
          {blog.comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              loggedInUserId={user?._id}
              queryClient={queryClient}
              deleteMutation={deleteMutation}
            />
          ))}
        </div>
      )}
      {/* Comment form */}
      {user && (
        <div className="mt-4">
          <h6>Write a Comment:</h6>
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment here..."
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
      <BlogList excludeBlogId={id} />
      {/* Delete Modal */}
      <DeleteModal
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

function Comment({ comment, loggedInUserId, queryClient, deleteMutation }) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", comment.user],
    queryFn: () => fetchUser(comment.user),
  });

  if (isLoading) {
    return <p>Loading user...</p>;
  }

  if (error) {
    console.log(error);
    return <p>Error loading user</p>;
  }

  const handleDelete = () => {
    deleteMutation.mutate(comment._id);
  };

  console.log(comment._id, "comment._id");
  console.log(comment.user, "comment.user");
  console.log(user._id, "user._id");

  return (
    <div className="comment d-flex align-items-start mb-3">
      <img
        src={user.profilePicture}
        alt={user.name}
        className="comment-user-image border border-1 border-success rounded-circle me-3"
        width={50}
        height={50}
      />
      <div>
        <p className="mb-1">
          <strong>{user.name}</strong>: {comment.comment}
          {comment.user === loggedInUserId ? (
            <AiOutlineDelete
              size={20}
              className="icon-hover m-2"
              onClick={handleDelete}
            />
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
}

export default Blog;
