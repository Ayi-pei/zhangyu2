import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../../server/hooks/useAuth';

interface ProtectedRouteProps {
  component: React.ComponentType<unknown>;
  path: string;
  exact?: boolean;
}

const ProtectedRoute = ({ component: Component, ...rest }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
