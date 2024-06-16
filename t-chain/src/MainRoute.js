import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth, SessionContext } from './useAuth';


const MainRoute = () => {
  
  const navigate = useNavigate();
  const { sessionId } = React.useContext(SessionContext);
  useAuth()
  useEffect(() => {
    if (sessionId !== null) {
      // Once we have the session ID, navigate to the /login route
      navigate('/login');
    }
  }, [sessionId]);

  // Render JSX based on the sessionId
  if (sessionId === null) {
    return <div>loading...</div>
  }
  
  // Still fetching the session ID, you can render a loading spinner here if you want
  return null;
};

export default MainRoute;