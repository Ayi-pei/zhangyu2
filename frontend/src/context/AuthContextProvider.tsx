import React from 'react';
import { AuthProvider } from './AuthContext';

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthContextProvider;
