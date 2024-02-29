import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const userEmail = sessionStorage.getItem('userEmail');

  useEffect(() => {
    // Fetch user details from the backend based on the stored email in session storage
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/user/${userEmail}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userEmail) {
      fetchUserDetails();
    }
  }, [userEmail]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      {userData ? (
        <div>
          <p>
            <span className="font-semibold">First Name:</span> {userData.firstName}
          </p>
          <p>
            <span className="font-semibold">Last Name:</span> {userData.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
