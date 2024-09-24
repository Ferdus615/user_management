import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  const token = localStorage.getItem('token'); 
  return !!token; 
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
