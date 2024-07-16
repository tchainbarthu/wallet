/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useContext } from 'react';
import "./style.css";
import { LanguageContext } from "../../Language/LanguageContext";
export const Sbumit = ({ active = true, className, textKey = "Logon", onClick }) => {
  const { translations } = useContext(LanguageContext);
  const text = translations[textKey];
  // console.log(`${className} active:`, active)
  const disable_class = active ? "" : "disabled";
  const localOnClick = () => {
    if (active) {
      onClick();
    }
  };
  return (
    <div className={`sbumit ${disable_class} ${className}`} onClick={localOnClick} disabled = {!active}>
      <div className="logon">{text}</div>
    </div>
  );
};

Sbumit.propTypes = {
  active: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
};
