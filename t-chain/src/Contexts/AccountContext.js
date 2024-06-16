import React, { createContext, useState, useContext } from 'react';

// Create the context
export const AccountContext = createContext();

// Create a provider component
export const AccountProvider = ({ children }) => {
  const [Account, setAccount] = useState('');

  return (
    <AccountContext.Provider value={{ Account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

// Create a custom hook for using the address context
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('Account must be used within an AddressProvider');
  }
  return context;
};