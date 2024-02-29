import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
      const resData = await res.json();
      console.log(resData);
      dispatch(setDataProduct(resData));
    })();
  }, []);

  // Check if the current location is within the admin panel
  const isWithinAdminPanel = location.pathname.startsWith("/admin");
  
  // Check if the current route is EditProduct
  const isEditProductPage = location.pathname.includes("/edit-product");

  return (
    <>
      <Toaster />
      <div>
        {/* Conditionally render the Header based on the location */}
        {!isWithinAdminPanel && !isEditProductPage && <Header />}
        <main className="pt-14 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
