import React, { createContext, useState, useContext } from 'react';

// Create the context
export const AddressContext = createContext();

// Create a provider component
export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState('');

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

// Create a custom hook for using the address context
export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};