// src/hooks/useBinding.ts
import { useContext } from 'react';
import { BindingContext } from '../context/BindingContext';

export const useBinding = () => {
  const context = useContext(BindingContext);
  if (!context) {
    throw new Error('useBinding must be used within a BindingProvider');
  }
  return context;
};
