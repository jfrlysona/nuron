import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const PrivateRoute = ({ roles }) => {
  const { decode } = useContext(UserContext);

  return decode ? (
    roles.includes(decode?.role) ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : roles.includes(decode?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
