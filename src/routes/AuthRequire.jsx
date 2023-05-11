import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const AuthRequire = ({ children }) => {
  const { initiallized, isAuthenicated } = useAuth();
  const location = useLocation();

  if (!isAuthenicated) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default AuthRequire;
