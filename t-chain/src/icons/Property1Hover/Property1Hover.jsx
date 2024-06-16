/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

import "./style.css";

export const Property1Hover = ({ color = "#A4C8FF", stroke = "black", className,onClick, disabled=true }) => {
  const handleClick = (event) => {
    if (!disabled) {
      onClick(event);
    }
  };
  const local_stroke = disabled ? "#D9D9D9" : stroke;
  return (
    <svg
      className={`property-1-hover ${className} ${disabled ? "disabled" : ""}`}
      fill="none"
      height="30"
      viewBox="0 0 30 30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="rect" fill={color} height="20" rx="8" stroke={local_stroke} width="20" x="0" y="5" onClick={handleClick} />
      <path className="path" d="M1 15 H20 M10 5 V23" stroke={local_stroke} />
    </svg>
  );
};

Property1Hover.propTypes = {
  color: PropTypes.string,
  stroke: PropTypes.string,
};
