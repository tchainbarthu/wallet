/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const DetailComponent = ({ className, onClick }) => {
  return (
    <div className={`detail-component ${className}`} onClick={onClick}>
      <div className="ellipse" />
      <div className="ellipse-2" />
      <div className="ellipse-3" />
      {/* <div className="overlay" onClick={onClick} /> */}
    </div>
  );
};
