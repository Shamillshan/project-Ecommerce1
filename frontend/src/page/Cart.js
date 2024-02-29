import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import  setCartItem  from "../redux/productSlice"; // Update the path

const Cart = () => {
  const dispatch = useDispatch();
  const email = sessionStorage.getItem("userEmail");
  const productCartItem = useSelector((state) => (email ? state.product.cartItem : []));

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  useEffect(() => {
    if (email) {
      // Retrieve cart items from sessionStorage
      const storedCart = JSON.parse(sessionStorage.getItem(`cart_${email}`) || "[]");

      // Dispatch action to set cart items in Redux state
      dispatch(setCartItem(storedCart));
    }
  }, [email, dispatch]);

  useEffect(() => {
    if (email) {
      // Update sessionStorage with the current cart items
      sessionStorage.setItem(`cart_${email}`, JSON.stringify(productCartItem));
    }
  }, [email, productCartItem]);

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-red-600">
          Your Cart Items
        </h2>

        {productCartItem[0] ? (
          <div className="my-3 flex gap-3">
            {/* display cart items */}
            <div className="w-full max-w-3xl">
              {productCartItem.map((el) => (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              ))}
            </div>

            {/* total cart item */}
            <div className="w-full max-w-md text-white bg-black ml-auto">
              <h2 className="bg-red-700 text-white font-bold p-1 text-lg">
                Summary
              </h2>
              <div className="flex w-full px-2 py-2 text-lg border-2 border-red-500 my-1">
                <p>Total Quantity :</p>
                <p className="ml-auto w-32 font-semibold">{totalQty}</p>
              </div>
              <div className="flex w-full px-2 py-2 text-lg border-2 border-red-500 my-2">
                <p>Total Price :</p>
                <p className="ml-auto w-32 font-semibold ">
                  <span className="text-red-500">₹ </span>
                  {totalPrice}
                </p>
              </div>
              <button className="bg-red-500 w-full text-lg font-bold py-2 ">
                Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-lg" alt="Empty Cart" />
            <p className="text-red-500 text-3xl font-bold">Cart is Empty</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
