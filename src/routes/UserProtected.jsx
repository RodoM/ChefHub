import React from "react";
import { useContext } from "react";
import { UserAuthenticationContext } from "../services/authentication/UserAuthenticationContext";
import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const { user } = useContext(UserAuthenticationContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default UserProtected;
