/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import { useContext } from "react";
import { LanguageContext } from "../../Language/LanguageContext";

export const TableRow = ({ className, TXBash, targetAddress, Amount, Time, Result }) => {
  const { translations } = useContext(LanguageContext);
  // const text = translations[textKey];
  return (
    <div className={`table-row ${className}`}>
      <img src="/svg/Strite_line.svg" className="strite-line-up" />
      <div className="overlap">
        {/* <div className="rectangle" /> */}
        <div className="div-label">{translations['txhash']}</div>
        <div className="div">{TXBash}</div>
      </div>
      <div className="overlap-group">
        {/* <div className="rectangle-2" /> */}
        <div className="div-label-1">{translations['target_address']}</div>
        <div className="text-wrapper-2">{targetAddress}</div>
      </div>
      <div className="overlap-2">
        {/* <div className="rectangle-3" /> */}
        <div className="div-label-2">{translations['status']}</div>
        <div className="text-wrapper-3">{Result}</div>
      </div>
      <div className="overlap-group-2">
        {/* <div className="rectangle-3" /> */}
        <div className="text-wrapper-3">{Time}</div>
      </div>
      <div className="overlap-3">
        {/* <div className="rectangle-3" /> */}
        <div className="div-label-3">{translations['amount']}</div>
        <div className="text-wrapper-4">{Amount}</div>
      </div>
      <img src="/svg/Strite_line.svg" className="strite-line-down" />
    </div>
  );
};
