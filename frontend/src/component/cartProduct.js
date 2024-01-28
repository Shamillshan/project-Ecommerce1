import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteCartItem , increaseQty , decreaseQty } from "../redux/productSlice";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch()

  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="bg-white p-3 rounded overflow-hidden">
        <img src={image} className="h-34 w-40 object-cover" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-xl ">
            {name}
          </h3>
          <div className="cursor-pointer text-xl hover:text-red-500" onClick={()=> dispatch(deleteCartItem(id))}>
            <MdDelete />
          </div>
        </div>
        <p className=" text-slate-500 font-medium ">{category}</p>
        <p className=" font-bold text-base">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between w-full">
          <div className="flex gap-4 items-center">
            <button onClick={()=>dispatch(increaseQty(id))} className="bg-red-500 py-1 my-1 text-white rounded hover:bg-red-700 transition duration-300 p-1 " >
              <FiPlus />
            </button>
            <p className="font-semibold p-1">{qty}</p>
            <button
              onClick={()=>dispatch(decreaseQty(id))}
              className="bg-red-500 py-1  text-white rounded hover:bg-red-700 transition duration-300 p-1"
            >
              <FiMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <p>Total : </p>
            <p> <span className="text-red-500">₹</span>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
