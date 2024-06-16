/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useReducer } from "react";
import "./style.css";
import { LanguageContext } from "../../Language/LanguageContext";

export const QueryTime = ({ property1, className, queryType, setQueryType }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });
  
  const handleTypeChange = (type) => {
    setQueryType(type);
  };
  const { translations } = useContext(LanguageContext);
  // const text = translations[textKey];
  const this_day = translations['thisDay'];
  const this_month = translations['thisMonth'];
  const specify_time_range = translations['specifyTimeRange'];
  const text = translations[queryType];
  // console.log('queryType:', queryType);
  return (
    <div
      className={`query-time ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="text-wrapper-4">{text}</div>
      {/* <img
        className={`img property-1-${state.property1}`}
        alt="Vector"
        src={state.property1 === "collepsed" ? "/img/vector-1-1.svg" : "/img/vector-1.svg"}
      /> */}
      {/* <img src="/svg/query_builder.svg" className="query-time"></img> */}
      <img src="/svg/query_builder.svg" className="img"></img>
      {state.property1 === "collepsed" && (
        <>
          <div
            className="div-wrapper"
            onClick={() => {
              dispatch("click_38");
              handleTypeChange('thisDay')
            }}
          >
            <div className="list-botton-2">{this_day}</div>
          </div>
          <div
            className="list-button-2"
            onClick={() => {
              dispatch("click_40");
              handleTypeChange('thisMonth')
            }}
          >
            <div className="list-botton-3">{this_month}</div>
          </div>
          <div
            className="list-button-3"
            onClick={() => {
              dispatch("click_42");
              handleTypeChange('specifyTimeRange')
            }}
          >
            <div className="list-botton-2">{specify_time_range}</div>
          </div>
        </>
      )}
    </div>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "collepsed",
        };
    }
  }

  if (state.property1 === "collepsed") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  switch (action) {
    case "click_38":
      return {
        ...state,
        property1: "collepsed",
      };

    case "click_40":
      return {
        ...state,
        property1: "collepsed",
      };

    case "click_42":
      return {
        ...state,
        property1: "collepsed",
      };
  }

  return state;
}

QueryTime.propTypes = {
  property1: PropTypes.oneOf(["collepsed", "default"]),
};
