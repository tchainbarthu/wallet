/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { useEffect } from 'react';
import { RadioButton } from "../RadioButton";
import "./style.css";

export const SelectionOption = ({
  optionText = "Select Option",
  stateProp,
  className,
  text = "Select Option",
  onClick,
}) => {

  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",
  });
  // Listen for changes to stateProp
  useEffect(() => {
    if (stateProp === 'selected') {
      dispatch({ type: 'select' }); // Assuming 'select' action sets state to 'selected'
    }
    else if (stateProp === 'default') {
      dispatch({type: 'default'})
    }

  }, [stateProp]);
  // console.log('stateProp', stateProp)
  // console.log('state.state', state.state)
  return (
    <div
      className={`selection-option ${className}`}
      onClick={onClick}
      // onClick={() => {
      //   dispatch({ type: "click" });
      // }}
      onMouseEnter={() => {
        if (state.state !== 'selected')
        {dispatch("mouse_enter");}
      }}
      onMouseLeave={() => {
        if (state.state !== 'selected') 
        {dispatch("mouse_leave");}
      }}
    >
      <RadioButton
        className="radio-button-instance"
        // stateProp={state.state === "hover" ? "havor" : state.state === "selected" ? "selected" : "default"}
        // stateProp={state.state}
        stateProp={state.state === 'selected' ? 'selected' : state.state === 'hover' ? 'havor' : 'default'}
      />
      <div className="select-option">
        {/* {state.state === "default" && <>{text}</>} */}
        {text}
        

        {/* {["hover", "selected"].includes(state.state) && <>{optionText}</>} */}
      </div>
    </div>
    
  );
};

// function reducer(state, action) {
//   if (state.state === "default") {
//     switch (action) {
//       case "mouse_enter":
//         return {
//           state: "hover",
//         };
//     }
//   }

//   if (state.state === "hover") {
//     switch (action) {
//       case "mouse_leave":
//         return {
//           state: "default",
//         };

//       case "click":
//         return {
//           state: "selected",
//         };
//     }
//   }

//   return state;
// }
function reducer(state, action) {
  // console.log('action', action)
  if (action.type === 'select') {
    return { state: "selected" };
  }
  else if (action.type == 'default'){
    return { state: "default" };
  }
  switch (action) {
    // case 'SET_STATE':
    //   return { state: action.payload };
    // case "select":
    //   return { state: "selected" };
    case "mouse_enter":
      return { state: "hover" };
    case "mouse_leave":
      return { state: "default" };
    
    default:
      return state;
  }
}
SelectionOption.propTypes = {
  optionText: PropTypes.string,
  stateProp: PropTypes.oneOf(["hover", "selected", "default"]),
  text: PropTypes.string,
};
