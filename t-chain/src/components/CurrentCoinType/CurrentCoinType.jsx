/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import { LanguageContext } from "../../Language/LanguageContext";
import { useContext } from "react";
export const CurrentCoinType = ({ className, textKey }) => {
  const { translations } = useContext(LanguageContext);
  const text = translations[textKey];
  return (
    <div className={`current-coin-type ${className}`}>
      <div className="overlap-group">
        <div className="rectangle" />
        <div className="text-wrapper-3">{text}</div>
      </div>
    </div>
  );
};
