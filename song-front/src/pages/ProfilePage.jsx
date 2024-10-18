import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { updateUserProfile } from "../services/ProfileService";
import { getUserDetailsFromToken } from "../Utils/TokenUtil";
import {
  getWeeklyListeningTime,
  getFavoriteArtists,
} from "../api/ListeningData";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    userName: "",
    profilePicture: null,
  });

  const [weeklyListeningTime, setWeeklyListeningTime] = useState(0);
  const [favoriteArtists, setFavoriteArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserDetailsFromToken().userId;
        console.log(`Fetching data for user ID: ${userId}`);

        const time = await getWeeklyListeningTime(userId);
        setWeeklyListeningTime(time);

        const artists = await getFavoriteArtists(userId);
        setFavoriteArtists(artists.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

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

  // Chart data for favorite artists
  const artistNames = favoriteArtists.map((artist) => artist[0]);
  const artistTimes = favoriteArtists.map((artist) => artist[1] / 60);

  const chartData = {
    labels: artistNames,
    datasets: [
      {
        label: "Minutes Listened",
        data: artistTimes,
        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
      },
    ],
  };

  return (
    <div className="content-below-navbar">
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="row flex-grow-1 m-3 justify-content-center">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header text-center">
                <h2>Edit Profile</h2>
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

          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header text-center">
                <h3>Your Listening Statistics</h3>
              </div>
              <div className="card-body">
                <p>
                  <strong>Weekly Listening Time:</strong> {weeklyListeningTime}{" "}
                  minutes
                </p>
                <div className="progress mb-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${(weeklyListeningTime / 600) * 100}%`,
                    }}
                    aria-valuenow={weeklyListeningTime}
                    aria-valuemin="0"
                    aria-valuemax="600"
                  ></div>
                </div>

                <h4>Favorite Artists</h4>
                <Bar data={chartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
