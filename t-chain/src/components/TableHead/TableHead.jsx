/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const TableHead = ({ className }) => {
  return (
    <div className={`table-head ${className}`}>
      <div className="overlap">
        <div className="rectangle" />
        <div className="div">交易hash</div>
      </div>
      <div className="overlap-group">
        <div className="rectangle-2" />
        <div className="text-wrapper-2">接收方</div>
      </div>
      <div className="overlap-2">
        <div className="rectangle-3" />
        <div className="text-wrapper-3">数量</div>
      </div>
      <div className="overlap-group-2">
        <div className="rectangle-3" />
        <div className="text-wrapper-3">时间</div>
      </div>
      <div className="overlap-3">
        <div className="rectangle-3" />
        <div className="text-wrapper-3">结果</div>
      </div>
    </div>
  );
};
