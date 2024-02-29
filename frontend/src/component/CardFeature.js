import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const Cardfeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for version 6

  const handleAddCartProduct = () => {
    const userEmail = sessionStorage.getItem('userEmail');

    if (!userEmail) {
      // If email is not stored in sessionStorage, show an alert and navigate to the login page
      alert("Please login to add to cart");
      navigate("/login"); // Use navigate to redirect
      return;
    }

    console.log("Add to Cart button clicked");
    
    dispatch(addCartItem({
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image
    }));
  }

  return (
    <div className="w-full min-w-[100px] max-w-[200px] hover:shadow-2xl drop-shadow-lg py-5 px-4 cursor-pointer">
      {image ? (
        <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
            <div className="h-30">
              <img src={image} className="h-full" alt={name} />
            </div>
            <h3 className="font-semibold text-slate-600 text-center capitalize mt-4">
              {name}
            </h3>
            <p className="text-center text-slate-500 font-normal">{category}</p>
            <p className="text-center font-bold text-slate-700">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <div className="flex justify-center items-center mt-1">
            <button className="bg-red-500 py-1 w-full text-white rounded hover:bg-red-600 transition duration-300" onClick={handleAddCartProduct}>
              Add To Cart
            </button>
          </div>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default Cardfeature;
