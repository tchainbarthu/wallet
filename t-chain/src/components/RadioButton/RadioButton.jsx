/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { useEffect} from 'react';
import "./style.css";

export const RadioButton = ({ stateProp, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",
  });
  useEffect(() => {
    dispatch({ type: 'SET_STATE', payload: stateProp });
  }, [stateProp]);
  // console.log('stateProp', stateProp)
  return (
    <div
      className={`radio-button state-${state.state} ${className}`}
      
    >
      {state.state === "selected" && <div className="ellipse" />}
    </div>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATE':
      return { state: action.payload };
    
}}




RadioButton.propTypes = {
  stateProp: PropTypes.oneOf(["havor", "selected", "default"]),
};
