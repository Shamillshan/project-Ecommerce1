import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    // Get the email from sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');

    if (userEmail) {
      // Fetch user details using the email
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/${userEmail}`, {
        method: 'GET',
        credentials: 'include', // Include credentials to send cookies
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setUserDetails(data);
          setEditedDetails({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            image: data.image,
          });
        })
        .catch(err => {
          console.error('Error fetching user details:', err);
          setError('Error fetching user details. Please try again later.');
        });
    } else {
      setError('Email not found in sessionStorage. Please log in.');
    }
  }, []);

  const handleEditClick = async () => {
    if (isEditing) {
      // Display a confirmation dialog
      const confirmed = window.confirm('Are you sure you want to save changes?');
  
      if (!confirmed) {
        return; // If the user cancels, do nothing
      }
  
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/update-user/${userDetails.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedDetails),
        });
  
        if (response.ok) {
          console.log('User details updated successfully!');
          // Optionally, you can fetch the updated user details after the update
          const updatedUserResponse = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/${userDetails.email}`, {
            method: 'GET',
            credentials: 'include',
          });
          const updatedUserData = await updatedUserResponse.json();
          setUserDetails(updatedUserData);
  
          // Exit edit mode
          setIsEditing(false);
        } else {
          console.error('Failed to update user details.');
        }
      } catch (error) {
        console.error('Error updating user details:', error);
      }
    } else {
      setIsEditing(true);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const dataUrl = await getImageDataUrl(file);
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      image: dataUrl,
    }));
  };

  const getImageDataUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="p-4">
      <div className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white">
        <h1 className="text-3xl font-semibold mb-4">Your Profile</h1>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : userDetails ? (
          <div>
            <div className="mb-4">
              <strong className="text-lg">First Name:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={editedDetails.firstName}
                  onChange={handleInputChange}
                />
              ) : (
                userDetails.firstName
              )}
            </div>
            <div className="mb-4">
              <strong className="text-lg">Last Name:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={editedDetails.lastName}
                  onChange={handleInputChange}
                />
              ) : (
                userDetails.lastName
              )}
            </div>
            <div className="mb-4">
              <strong className="text-lg">Email:</strong> {userDetails.email}
            </div>
            {userDetails.image && (
              <div className="mb-4">
                <strong className="text-lg">Image:</strong>
                {isEditing ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {editedDetails.image && (
                      <img
                        src={editedDetails.image}
                        alt={`${editedDetails.firstName}'s profile`}
                        className="w-28 h-auto mt-2"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={userDetails.image}
                    alt={`${userDetails.firstName}'s profile`}
                    className="w-28 h-auto mt-2"
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}

        <div className="mt-4">
          {isEditing && (
            <button
              className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded mr-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          )}
          <button
            className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded"
            onClick={handleEditClick}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
