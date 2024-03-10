import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

const AdminHeader = ({ handleSidebarToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRedux());

    // Clear the email from sessionStorage
    sessionStorage.removeItem('userEmail');

    toast("Logout Successfully");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">
          Portronics - Admin Panel
        </h1>
        <div className="flex items-center">
          <button
            className="text-white focus:outline-none mr-4"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="text-white focus:outline-none"
            onClick={handleSidebarToggle}
          >
            {/* ... (your sidebar icon) */}
          </button>
        </div>
      </div>
      <nav className="pb-4">
        {/* ... (your navigation links) */}
      </nav>
    </div>
  );
};

export default AdminHeader;
