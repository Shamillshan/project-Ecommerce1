import React, { useState } from "react";
import logo from "../assest/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    // Dispatch logout action to clear user data in Redux
    dispatch(logoutRedux());

    // Remove 'userEmail' key from sessionStorage
    sessionStorage.removeItem('userEmail');

    toast("Logout Successfully");

    // Navigate to the login page after logout
    navigate("/login");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);
  const userEmail = sessionStorage.getItem('userEmail');

  return (
    <header className="fixed shadow-md w-full h-15 px-3 md:px-4 flex justify-between items-center z-50 bg-white">
      {/* desktop */}
      <div>
        <Link to={""}>
          <div className="h-16">
            <img src={logo} className="h-full" alt="" />
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <nav className=" gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
          <Link to={""}>Home</Link>
          <Link to={"menu/65a6e81d9b46bfc844a65e6b"}>Menu</Link>
          <Link to={"contact"}>Contact</Link>
        </nav>
        <div className="text-2xl text-slate-600 ml-4 relative cursor-pointer">
          <Link to={"cart"}>
            <FaShoppingCart />
            <div className="absolute -top-1 -right-1 text-white bg-red-600 h-4 w-4 text-sm text-center rounded-full m-0 p-0">
              {cartItemNumber.length}
            </div>
          </Link>
        </div>
        <div className="text-slate-600 ml-4" onClick={handleShowMenu}>
          <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
            {userData.image ? <img src={userData.image} alt="" className="h-full w-full" /> : <HiOutlineUserCircle />}
          </div>
          {showMenu && (
            <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
              {userData.image ? (
                <>
                  {userEmail && <Link to={"/profile"} className="whitespace-nowrap cursor-pointer px-2">My Profile</Link>}
                  <p className="cursor-pointer text-white px-2 bg-red-500" onClick={handleLogout}>Logout</p>
                </>
              ) : (
                <Link to={"login"} className="whitespace-nowrap cursor-pointer px-2">Login</Link>
              )}
              <nav className=" text-base md:text-lg flex flex-col md:hidden ">
                <Link to={""} className="px-2 py-1">Home</Link>
                <Link to={"menu/65a6e8e79b46bfc844a65e6f"} className="px-2 py-1">Menu</Link>
                <Link to={"contact"} className="px-2 py-1">Contact</Link>
              </nav>
            </div>
          )}
        </div>
      </div>
      {/* mobile */}
    </header>
  );
};

export default Header;
