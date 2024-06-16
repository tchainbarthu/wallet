/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useContext } from 'react';
import "./style.css";
import { LanguageContext } from "../../Language/LanguageContext";
export const RedirectLink = ({ className, textKey = "", href="#" }) => {
  const { translations } = useContext(LanguageContext);
  const text = translations[textKey];
  return (
    <a href={href} className={`redirect-link ${className}`}>
      <div className="text-wrapper-2">{text}</div>
    </a>
  );
};

RedirectLink.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
};
