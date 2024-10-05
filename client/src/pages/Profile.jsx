import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
import BlogList from "../components/BlogList";
import { useAuthStore } from "../store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/api";
import { deleteImage, uploadImage } from "../services/firebase";
import toast from "react-hot-toast";

function Profile() {
  const { user, isLoading, error, updateUser } = useAuthStore();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    bio: user.bio,
    location: user.location,
    phone: user.phone,
    profilePicture: user.profilePicture,
    email: user.email,
  });
  const [imageFile, setImageFile] = useState(null);
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: (data) => {
      updateUser(data.user);
      queryClient.invalidateQueries("userProfile");
      setEditMode(false);
      setIsUpdating(false);
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      console.log(error);
      setIsUpdating(false);
      toast.error("Error updating profile");
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({ ...profileData, profilePicture: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    let updatedProfileData = { ...profileData };

    if (imageFile) {
      try {
        // Delete the previous image if it exists
        if (
          user.profilePicture &&
          user.profilePicture.includes("firebasestorage.googleapis.com")
        ) {
          await deleteImage(user.profilePicture);
        }
        const imageUrl = await uploadImage(imageFile);
        updatedProfileData.profilePicture = imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error.message);
        toast.error("Error uploading image");
        return;
      }
    }

    // Preserve the email if it is not being updated
    if (!profileData.email) {
      updatedProfileData.email = user.email;
    }

    mutation.mutate(updatedProfileData);
  };

  return (
    <div className="container my-5 profile-container">
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={profileData.profilePicture}
            alt={profileData.name}
            className="img-fluid rounded-circle profile-picture mb-3"
          />
          {editMode && (
            <input
              type="file"
              className="form-control mb-3"
              onChange={handleImageChange}
            />
          )}
          {editMode ? (
            <input
              type="text"
              className="form-control mb-3"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
            />
          ) : (
            <h2 className="profile-name">{profileData.name}</h2>
          )}
          {editMode ? (
            <textarea
              className="form-control mb-3"
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
            />
          ) : (
            <p className="profile-bio">{profileData.bio}</p>
          )}
        </div>
        <div className="col-md-8">
          <div className="profile-details">
            <h4>Contact Information</h4>
            <ul className="list-unstyled">
              <li>
                <strong>Location:</strong>{" "}
                {editMode ? (
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                  />
                ) : (
                  profileData.location
                )}
              </li>
              <li>
                <strong>Email:</strong>{" "}
                {editMode ? (
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <a href={`mailto:${profileData.email}`}>
                    {profileData.email}
                  </a>
                )}
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                {editMode ? (
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  profileData.phone
                )}
              </li>
            </ul>
            {editMode ? (
              <button className="btn btn-primary" onClick={handleSave}>
                {isUpdating ? "Updating..." : "Save"}
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
      <BlogList />
    </div>
  );
}

export default Profile;
