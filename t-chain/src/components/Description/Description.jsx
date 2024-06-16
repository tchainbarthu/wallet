/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useContext } from 'react';
import "./style.css";
import { LanguageContext } from "../../Language/LanguageContext";
export const Description = ({ className , textKey}) => {
  const { translations } = useContext(LanguageContext);
  const text = translations[textKey];
  const getHeight = (property) => {
    // Change the conditions and heights based on your needs
    if (property === "english") {
      return '200px';
    } else if (property === "chinese") {
      return '200px';
    } else {
      return 'auto';
    }
  };
  return (
    <div className={`description ${className}`}>
      <div className="text-1">{text}</div>
    </div>
  );
};

Description.propTypes = {
  property1: PropTypes.oneOf(["english", "chinese"]),
};
