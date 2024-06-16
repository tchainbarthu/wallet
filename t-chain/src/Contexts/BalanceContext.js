import React, { createContext, useState, useContext } from 'react';

// Create the context
export const BalanceContext = createContext();

// Create a provider component
export const BalanceProvider = ({ children }) => {
  const [Balance, setBalance] = useState('');

  return (
    <BalanceContext.Provider value={{ Balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

// Create a custom hook for using the address context
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error('BalanceContext must be used within an AddressProvider');
  }
  return context;
};