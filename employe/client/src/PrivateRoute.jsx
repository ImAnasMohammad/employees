import React from 'react';
import { useAuth } from './hooks/useAuth';
import { Navigate,Outlet } from 'react-router';

const PrivateRoute = ({children}) => {
  const {token} = useAuth();
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
