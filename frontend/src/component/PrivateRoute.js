// frontend/src/component/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Dùng để giải mã token

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/adminlogin" />;
  }

  try {
    const decoded = jwtDecode(token); // Giải mã token
    if (decoded.role !== "admin") {
      return <Navigate to="/adminlogin" />; // Nếu không phải admin thì redirect
    }
    return element;
  } catch (error) {
    return <Navigate to="/adminlogin" />;
  }
};

export default PrivateRoute;
