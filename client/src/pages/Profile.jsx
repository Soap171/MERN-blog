import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
import BlogList from "../components/BlogList";

function Profile() {
  const user = {
    name: "John Doe",
    bio: "Software Engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
    profilePicture: "https://via.placeholder.com/150",
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
  };

  return (
    <div className="container my-5 profile-container">
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={user.profilePicture}
            alt={user.name}
            className="img-fluid rounded-circle profile-picture mb-3"
          />
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-bio">{user.bio}</p>
        </div>
        <div className="col-md-8">
          <div className="profile-details">
            <h4>Contact Information</h4>
            <ul className="list-unstyled">
              <li>
                <strong>Location:</strong> {user.location}
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </li>
              <li>
                <strong>Phone:</strong> {user.phone}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <BlogList />
    </div>
  );
}

export default Profile;
