import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";  


const Cardfeature = ({ image, name, price, category, loading,id }) => {
  const dispatch = useDispatch()
  const handleAddCartProduct = (e)=>{

    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image
    }))
  }

  return (
    <div className="w-full min-w-[100px] max-w-[200px] hover:shadow-2xl drop-shadow-lg py-5 px-4 cursor-pointer">
      {image ? (
        <>
          <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior : "smooth"})}>
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
              {" "}
              {/* Flexbox for centering */}
              <button className="bg-red-500 py-1 w-full text-white rounded hover:bg-red-600 transition duration-300" onClick={handleAddCartProduct}>
                Add To Cart
              </button>
            </div>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center  items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default Cardfeature;
