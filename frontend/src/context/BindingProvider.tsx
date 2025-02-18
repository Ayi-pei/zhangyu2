import { useState, ReactNode } from 'react';
import { BindingContext, BindingContextType } from './BindingContext';

export const BindingProvider = ({ children }: { children: ReactNode }) => {
  const [bindingCardNumber, setBindingCardNumber] = useState('');
  const [bindingBank, setBindingBank] = useState('');
  const [bindingExchangeCode, setBindingExchangeCode] = useState('');
  const [bindingCardHolder, setBindingCardHolder] = useState('');

  const contextValue: BindingContextType = {
    bindingCardNumber,
    setBindingCardNumber,
    bindingBank,
    setBindingBank,
    bindingExchangeCode,
    setBindingExchangeCode,
    bindingCardHolder,
    setBindingCardHolder,
  };

  return (
    <BindingContext.Provider value={contextValue}>
      {children}
    </BindingContext.Provider>
  );
};
