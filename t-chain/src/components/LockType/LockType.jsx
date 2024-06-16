/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { useReducer } from "react";
import "./style.css";
import { LanguageContext } from "../../Language/LanguageContext";

export const LockType = ({ property1, className, LockType, setType, disabled = false }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  
  
  const { translations } = useContext(LanguageContext);
  // const text = translations[textKey];
  const based_on_day = translations['based_on_day'];
  const linear = translations['linear'];
  // const text = based_on_day;
  // let text = translations['based_on_day'];
  // const { text, setText} = useState(translations['based_on_day']);
  // console.log('LockType:', LockType);
  const text = translations[LockType];
  // console.log('text:', text);
  const handleClick = () => {
    if (disabled) {
      return;
    }
    dispatch("click");
  };
  const handleTypeChange = (type) => {
    setType(type);
    // setText(translations[type]);
  };
  return (
    <div
      className={`lock-type ${className}`}
      onClick={handleClick}
    >
      <div className={`text-wrapper ${disabled ? 'disabled' : ''}`}>{text}</div>
      <img
        className={`img property-1-${state.property1}`}
        alt="Vector"
        src={state.property1 === "collepsed" ? "/img/vector-1-1.svg" : "/img/vector-1.svg"}
      />
      {state.property1 === "collepsed" && (
        <>
          <div
            className="div-wrapper"
            onClick={() => {
              dispatch("click_38");
              handleTypeChange('linear')
            }}
          >
            <div className="list-botton-2" >{linear}</div>
          </div>
          <div
            className="list-button-2"
            onClick={() => {
              dispatch("click_40");
              handleTypeChange('based_on_day')
            }}
          >
            <div className="list-botton-3" >{based_on_day}</div>
          </div>
          
        </>
      )}
    </div>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "collepsed",
        };
    }
  }

  if (state.property1 === "collepsed") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  switch (action) {
    case "click_38":
      console.log('click_38');
      return {
        ...state,
        property1: "collepsed",
      };

    case "click_40":
      console.log('click_40');
      return {
        ...state,
        property1: "collepsed",
      };

    case "click_42":
      return {
        ...state,
        property1: "collepsed",
      };
  }

  return state;
}

LockType.propTypes = {
  property1: PropTypes.oneOf(["collepsed", "default"]),
};
