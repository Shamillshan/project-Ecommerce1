import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Fetch admin dashboard statistics from the backend API
    fetch("http://localhost:8080/admin/stats", {
      method: "GET",
      headers: {
        
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalProducts(data.totalProducts);
        setTotalUsers(data.totalUsers);
      })
      .catch((error) => console.error("Error fetching admin stats:", error));
  }, []);

  return (
    <div>
      <AdminHeader/>
   
      {/* Content */}
      <div className="flex-1 p-10">
        <nav className="bg-blue-500 text-white p-4 mb-4">
          <ul className="flex justify-center space-x-4">
            {/* <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li> */}
            <li>
              <Link to="/admin/add-product">Add Products</Link>
            </li>
            <li>
              <Link to="/admin/view-product">Manage Products</Link>
            </li>
            <li>
              <Link to="/admin/view-users">Manage Users</Link>
            </li>
            <li>
              <Link to="/admin/view-orders">Manage Orders</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-md p-4">
            <h3 className="text-xl font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-blue-500">
              {totalProducts}
            </p>
          </div>
          <div className="bg-white rounded-md p-4">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-green-500">
              {totalUsers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
