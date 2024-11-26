import React from 'react';
import { useAuth } from './hooks/useAuth';
import { Navigate,Outlet } from 'react-router';

const PublicRoute = () => {
  const {token} = useAuth();
  if (!token) {
    console.log("err")
    return <Navigate to="/login" replace />;
  }
  return <Outlet/>;
};

export default PublicRoute;
