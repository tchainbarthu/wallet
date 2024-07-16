import React, { createContext, useState, useContext } from 'react';

// Create the context
export const CarbonAPersonalAmountContext = createContext();

// Create a provider component
export const CarbonAPersonalAmountProvider = ({ children }) => {
  const [CarbonAPersonalAmount, setCarbonAPersonalAmount] = useState('');

  return (
    <CarbonAPersonalAmountContext.Provider value={{ CarbonAPersonalAmount, setCarbonAPersonalAmount }}>
      {children}
    </CarbonAPersonalAmountContext.Provider>
  );
};

// Create a custom hook for using the address context
export const useCarbonAPersonalAmount = () => {
  const context = useContext(CarbonAPersonalAmountContext);
  if (context === undefined) {
    throw new Error('CarbonAAmountContext must be used within an AddressProvider');
  }
  return context;
};