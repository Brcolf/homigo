import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './firebase';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

export default ProtectedRoute;