import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

export const PrivateLoginRoute = () => {
  const location = useLocation();
  const accessToken = Cookies.get('accessToken');
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export const PrivateAdminRoute = () => {
    const location = useLocation();
    const accessToken = Cookies.get('accessToken');
    const userRole = Cookies.get('userRole');
    return accessToken && userRole ==="ADMIN" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  };
