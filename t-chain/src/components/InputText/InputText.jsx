/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useContext } from 'react';
import "./style.css";
import { LanguageContext } from "../../Language/LanguageContext";
export const InputText = ({ className,  inputType = "text", onChange ,textKey, specialText, disabled = false, value=''}) => {
  const { translations } = useContext(LanguageContext);
  let text = translations[textKey];
  // if (disabled && (specialText !== undefined)) {
  //   text = specialText;
  // }
  console.log('disabled:', disabled)
  if (disabled){
    
    inputType = "text";
  }
  if (specialText !== undefined) {
    text = specialText;
  }
  if (inputType === 'text') {
  return <input className={`input-text ${className}`} placeholder={text} type={inputType} onChange={onChange} disabled={disabled} defaultValue={value}/>;
  }
  else {
    return <input className={`input-text ${className}`} placeholder={text} type={inputType} onChange={onChange} defaultValue={value}/>;
  }
};

InputText.propTypes = {
  text: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
