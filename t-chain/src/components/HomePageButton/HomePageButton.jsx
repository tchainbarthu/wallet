/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

import { useContext } from "react";

import { LanguageContext } from "../../Language/LanguageContext";

export const HomePageButton = ({ className, textKey, selected, onClick, disabled=false }) => {
  
  const { translations, language } = useContext(LanguageContext);
  const text = translations[textKey];
  const selectedClass = selected ? 'selected': '';
  const onClick_local = disabled ? ()=>{} : onClick;
  const disabled_class = disabled ? 'disabled' : '';
  return (
    <div className={`home-page-button ${className} ${disabled_class} ${selectedClass}`} onClick={onClick_local}>
      <div className={`div-wrapper`}>
        <div className={`text-wrapper-4 ${language}`}>{text}</div>
      </div>
    </div>
  );
};
