import React, { createContext, useState, useContext } from 'react';

// Create the context
export const PasswordContext = createContext();

// Create a provider component
export const PasswordProvider = ({ children }) => {
  const [AlreadyPassword, setAlreadyPassword] = useState('');

  return (
    <PasswordContext.Provider value={{ AlreadyPassword, setAlreadyPassword }}>
      {children}
    </PasswordContext.Provider>
  );
};

// Create a custom hook for using the address context
export const usePassword = () => {
  const context = useContext(PasswordContext);
  if (context === undefined) {
    throw new Error('Account must be used within an PasswordContextProvider');
  }
  return context;
};