import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Menu from "./page/Menu";
import Contact from "./page/Contact";
import Login from "./page/login";
import Newproduct from "./admin/Newproduct";
import Signup from "./page/Signup";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import Cart from "./page/Cart";
import AdminDashboard from './admin/AdminDashboard'
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/Editproduct";
import Manageusers from "./admin/Manageusers";
import  Profile  from "./page/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="menu/:filterby" element={<Menu />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="newproduct" element={<Newproduct />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/add-product" element={<Newproduct/>} />
      <Route path="/admin/view-product" element={<ProductList/>} />
      <Route path="/edit-product/:productId" element={<EditProduct />} />
      <Route path="/admin/view-users" element={<Manageusers />} />
      <Route path="/profile" element={<Profile/>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* Move RouterProvider to wrap the entire App */}
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider> 
  
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
