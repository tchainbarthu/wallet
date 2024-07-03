/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const HomeListComponet = ({ className, selected, onClick, onDoubleClick, img_src, name, description }) => {
  const selectedClass = selected ? 'selected' : '';
  return (
    <div className={`home-list-componet ${className} ${selectedClass}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      >
      <div className="overlap-group">
        <div className={`rectangle `} />
        <img className="coin-icon" src="/img/circle.png"/>
        <img className="t-chain-coin" src={img_src}/>
        <div className="text-wrapper">{name}</div>
        <div className="text-wrapper-1">{description}</div>
      </div>
    </div>
  );
};
