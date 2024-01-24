// Home.js
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css"; // Import the CSS file

function Home() {
  const location = useLocation();
  const token = location.state.token;
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/getUser", {
          headers: { "x-access-token": token }
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    // Fetch all users data
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/getAllUser");
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching all users data:", error.message);
      }
    };

    // Call the functions
    fetchUserData();
    fetchAllUsers();
  }, [token]);

  return (
    <div className="home-container">
      <Navbar />
      <h3 className="heading"></h3>

      <div className="user-section">
        <h4>User Data:</h4>
        {userData ? (
          <div className="user-data">
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        ) : (
          <p className="loading">Loading user data...</p>
        )}
      </div>

      <div className="user-section">
        <h4>All Users:</h4>
        {allUsers ? (
          <div className="all-users">
            <pre>{JSON.stringify(allUsers, null, 2)}</pre>
          </div>
        ) : (
          <p className="loading">Loading all users data...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
