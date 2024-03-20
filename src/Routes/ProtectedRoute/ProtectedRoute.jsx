import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  return localStorage.getItem("uid") ?
    JSON.parse(localStorage.getItem("user")).type == "admin" ?
      < Outlet />
      : <Navigate to={"/Portal"} />
    : <Navigate to={"/"} />;
};


const StdProtectedRoute = () => {
  return localStorage.getItem("uid") ?
    JSON.parse(localStorage.getItem("user")).type == "std" ?
      < Outlet />
      : <Navigate to={"/Dashboard"} />
    : <Navigate to={"/"} />;
};


export default AdminProtectedRoute;
export {
  StdProtectedRoute
}