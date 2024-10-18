import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { updateUserProfile } from "../services/ProfileService";
import { getUserDetailsFromToken } from "../Utils/TokenUtil";
import {
  getWeeklyListeningTime,
  getFavoriteArtists,
} from "../api/ListeningData";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    userName: "",
    profilePicture: null,
  });

  const [weeklyListeningTime, setWeeklyListeningTime] = useState(0);
  const [favoriteArtists, setFavoriteArtists] = useState([]); // For storing favorite artists

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserDetailsFromToken().userId;
        console.log(`Fetching data for user ID: ${userId}`);

        // Fetch weekly listening time
        const time = await getWeeklyListeningTime(userId);
        setWeeklyListeningTime(time);

        // Fetch favorite artists
        const artists = await getFavoriteArtists(userId);
        setFavoriteArtists(artists.slice(0, 3)); // Limit to top 3 artists
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchData();
  }, []);

  // Input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profileData.firstName)
      formData.append("firstName", profileData.firstName);
    if (profileData.lastName) formData.append("lastName", profileData.lastName);
    if (profileData.password) formData.append("password", profileData.password);
    if (profileData.userName) formData.append("userName", profileData.userName);
    if (profileData.profilePicture)
      formData.append("profilePicture", profileData.profilePicture);

    const userId = getUserDetailsFromToken().userId;
    try {
      await updateUserProfile(userId, formData);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile");
    }
  };

  return (
    <div className="content-below-navbar">
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="row flex-grow-1 m-1">
          <div className="col-md-12">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header text-center">
                    <h2>Edit Profile</h2>
                    {/* Display the listening time */}
                    <p>Weekly Listening Time: {weeklyListeningTime} minutes</p>
                    {/* Display favorite artists */}
                    <h3>Your Favorite Artists</h3>
                    <ul>
                      {favoriteArtists.map((artistData, index) => (
                        <li key={index}>
                          {artistData[0]} - {Math.floor(artistData[1] / 60)}{" "}
                          minutes listened
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          name="userName"
                          value={profileData.userName}
                          onChange={handleInputChange}
                          placeholder="Enter your username"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={profileData.password}
                          onChange={handleInputChange}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Profile Picture</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
