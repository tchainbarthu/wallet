import React, { createContext, useState, useContext } from 'react';

// Create the context
export const GasValueContext = createContext();

// Create a provider component
export const GasValueProvider = ({ children }) => {
  const [GasValue, setGasValue] = useState('');

  return (
    <GasValueContext.Provider value={{ GasValue, setGasValue }}>
      {children}
    </GasValueContext.Provider>
  );
};

// Create a custom hook for using the address context
export const useGasValue = () => {
  const context = useContext(GasValueContext);
  if (context === undefined) {
    throw new Error('GasValueContext must be used within an AddressProvider');
  }
  return context;
};