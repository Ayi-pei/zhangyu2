import React from 'react';
import { AuthProvider } from '../../frontend/src/components/AuthContext';

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthContextProvider;
