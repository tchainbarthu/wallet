// loginStatusContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePassword } from './Contexts/PasswordContext';
export const LoginStatusContext = createContext();

export const LoginStatusProvider = ({ children }) => {
  const [isLoginFinished, setIsLoginFinished] = useState(false);
  const navigate = useNavigate();

  return (
    <LoginStatusContext.Provider value={{ isLoginFinished, setIsLoginFinished }}>
      {children}
    </LoginStatusContext.Provider>
  );
};

export const useLoginStatus = () => {
  const context = useContext(LoginStatusContext);
  if (context === undefined) {
    throw new Error('useLoginStatus must be used within a LoginStatusProvider');
  }
  return context;
};

export const useLoginRedirect = () => {
  const { isLoginFinished } = useLoginStatus();
  const navigate = useNavigate();
  const { AlreadyPassword, setAlreadyPassword } = usePassword();



  React.useEffect(() => {
   
    if (!isLoginFinished) {
      navigate('/login');
    }
    if (!AlreadyPassword) {
      navigate('/login');
    }
  }, [isLoginFinished, navigate, AlreadyPassword]);
};