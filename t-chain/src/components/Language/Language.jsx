/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useContext } from 'react';
import { LanguageContext } from '../../Language/LanguageContext'; // adjust the path as necessary
import { useReducer } from "react";
import "./style.css";

export const Language = ({ property1, className, textKey='languageMode' }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const handleChangeLanguage = (language) => {
    setLanguage(language);
  };
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });
  const { translations } = useContext(LanguageContext);
  const text = translations[textKey];
  return (
    <div
      className={`language ${className}`}
      onClick={() => {
        dispatch("click");
        // handleChangeLanguage();
      }}
    >
      <div className={`text-wrapper ${language}`}>{text}</div>
      <img
        className={`vector ${state.property1}`}
        alt="Vector"
        src={state.property1 === "collepsed" ? "/img/vector-1-1.svg" : "/img/vector-1.svg"}
      />
      {/* <img
        className={`vector ${state.property1}`}
        alt="Vector"
        src="/svg/Language.svg"
      /> */}
      {state.property1 === "collepsed" && (
        <div className="language-list">
          <div className="list-button">
            <div className="list-botton" onClick={() => {handleChangeLanguage('en')}}>English</div>
          </div>
          <div className="list-botton-wrapper">
            <div className="list-botton" onClick={() => {handleChangeLanguage('zh')}}>中文</div>
          </div>
        </div>
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

  return state;
}

Language.propTypes = {
  property1: PropTypes.oneOf(["collepsed", "default"]),
};
