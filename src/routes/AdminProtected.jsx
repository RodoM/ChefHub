import React from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtected;
