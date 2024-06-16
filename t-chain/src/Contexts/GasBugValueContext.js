import React, { createContext, useState, useContext } from 'react';

// Create the context
export const GasBuyValueContext = createContext();

// Create a provider component
export const GasBuyValueProvider = ({ children }) => {
  const [GasBuyValue, setGasBuyValue] = useState('');

  return (
    <GasBuyValueContext.Provider value={{ GasBuyValue, setGasBuyValue }}>
      {children}
    </GasBuyValueContext.Provider>
  );
};

// Create a custom hook for using the address context
export const useGasBuyValue = () => {
  const context = useContext(GasBuyValueContext);
  if (context === undefined) {
    throw new Error('GasBuyValueContext must be used within an AddressProvider');
  }
  return context;
};