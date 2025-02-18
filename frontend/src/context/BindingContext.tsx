import { createContext } from 'react';

export interface BindingContextType {
  bindingCardNumber: string;
  setBindingCardNumber: React.Dispatch<React.SetStateAction<string>>;
  bindingBank: string;
  setBindingBank: React.Dispatch<React.SetStateAction<string>>;
  bindingExchangeCode: string;
  setBindingExchangeCode: React.Dispatch<React.SetStateAction<string>>;
  bindingCardHolder: string;
  setBindingCardHolder: React.Dispatch<React.SetStateAction<string>>;
}

export const BindingContext = createContext<BindingContextType | undefined>(undefined);
