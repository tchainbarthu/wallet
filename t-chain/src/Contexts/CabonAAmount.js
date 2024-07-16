import React, { createContext, useState, useContext } from 'react';

// Create the context
export const CarbonAAmountContext = createContext();

// Create a provider component
export const CarbonAAmountProvider = ({ children }) => {
  const [CarbonAAmount, setCarbonAAmount] = useState('');

  return (
    <CarbonAAmountContext.Provider value={{ CarbonAAmount, setCarbonAAmount }}>
      {children}
    </CarbonAAmountContext.Provider>
  );
};

// Create a custom hook for using the address context
export const useCarbonAAmountContext = () => {
  const context = useContext(CarbonAAmountContext);
  if (context === undefined) {
    throw new Error('CarbonAAmountContext must be used within an AddressProvider');
  }
  return context;
};