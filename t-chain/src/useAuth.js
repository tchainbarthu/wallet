// useAuth.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { REQUEST_SESSION_TEMPLATE } from './config';
const API_URL = window.TCHAIN_API_URL;

export const SessionContext = createContext();
// export const LoginStatusContext = createContext();

// TODO: Better save the login into a cookie or local storage
// will do this later


export const SessionProvider = ({ children }) => {
    const [sessionId, setSessionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [isLoginFinished, setIsLoginFinished] = useState(false);

    return (
      <SessionContext.Provider value={{ sessionId, setSessionId, isLoading, setIsLoading }}>
        {children}
      </SessionContext.Provider>
    );
  };

export const fetchSessionId = async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(REQUEST_SESSION_TEMPLATE),
    });
    const data = await response.json();
    return data.result.content.session;
  };



export const useAuth = () => {
    const { sessionId, isLoading, setSessionId } = useContext(SessionContext);
    // const { isLoginFinished, setIsLoginFinished } = useContext(LoginStatusContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !sessionId) {
          // Fetch a session ID here and update the context
          // fetch(API_URL, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(REQUEST_SESSION_TEMPLATE),
          // })
          //   .then(response => response.json())
          //   .then(data => setSessionId(data.result.content.session))
          //   .catch(error => console.error('Error:', error));
          fetchSessionId().then(sessionId => setSessionId(sessionId)).catch(error => console.error('Error:', error));
        } else if (sessionId) {
            console.log('already got session ID:', sessionId);
        //   navigate('/login');
        }
      }, [isLoading, sessionId, setSessionId]);

};