/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useContext } from 'react';
import "./style.css";
import { LanguageContext } from "../../Language/LanguageContext";
export const Label = ({ className, textKey}) => {
  const { translations } = useContext(LanguageContext);
  const text = translations[textKey];
  return (
    <div className={`label ${className}`}>
      <div className="div">{text}</div>
    </div>
  );
};

Label.propTypes = {
  text: PropTypes.string,
};
