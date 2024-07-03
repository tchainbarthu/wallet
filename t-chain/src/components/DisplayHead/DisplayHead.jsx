/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const DisplayHead = ({ className, address, balance , img_src, description}) => {
  return (
    <div className={`display-head ${className}`}>
      <div className="text-wrapper">{description}</div>
      <div className="div">{address}</div>
      <div className="text-wrapper-2">{balance.toFixed(2)}</div>
      <img className="coin-icon" src="/img/circle.png"/>
      <img className="t-chain-coin" src={img_src}/>
    </div>
  );
};
