import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { Outlet, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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

  return (
    <>
      <Toaster />
      <div>
        {/* Conditionally render the Header based on the location */}
        {!isWithinAdminPanel && <Header />}
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
