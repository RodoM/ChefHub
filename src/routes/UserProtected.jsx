import React from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtected;
