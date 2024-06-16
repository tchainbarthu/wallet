import React, { createContext, useState, useContext } from 'react';

// Create the context
export const AlreadyAccountContext = createContext();

// Create a provider component
export const AlreadyAccountProvider = ({ children }) => {
  const [alreadyAddress, setAlreadyAddress] = useState('');

  return (
    <AlreadyAccountContext.Provider value={{ alreadyAddress, setAlreadyAddress }}>
      {children}
    </AlreadyAccountContext.Provider>
  );
};

// Create a custom hook for using the address context
export const useAlreadyAccount = () => {
  const context = useContext(AlreadyAccountContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};