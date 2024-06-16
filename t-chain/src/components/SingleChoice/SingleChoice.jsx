/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { useContext, useState } from "react";
import { SelectionOption } from "../SelectionOption";
import "./style.css";


import { LanguageContext } from "../../Language/LanguageContext";

export const SingleChoice = ({
  selectedOption,
  className,
  onOptionChange,
  selectionOptionText = "Select Option",
  selectionOptionText1 = "Select Option",
  selectionOptionText2 = "Select Option",
  
}) => {
  
  const { translations } = useContext(LanguageContext);
  const text1 = translations[selectionOptionText];
  const text2 = translations[selectionOptionText1];
  const text3 = translations[selectionOptionText2];
  const handleClick = (option) => {
    onOptionChange(option);
  };
  const [state, dispatch] = useReducer(reducer, {
    selectedOption: selectedOption || "none",
  });
  // Click handler
  // const handleClick = (option) => {
  //   dispatch({ type: 'SET_SELECTED_OPTION', payload: option });
  // };
  // console.log('state.selectedOption', state.selectedOption)
  return (
    <div className={`single-choice ${className}`}>
      <SelectionOption
        className="selection-option-instance"
        onClick={() => {
          dispatch("click");
          handleClick('one');
        }}
        // onClick={() => handleClick("one")}

        optionText={state.selectedOption === "one" ? "Select Option" : undefined}
        stateProp={state.selectedOption === "one" ? "selected" : "default"}
        text={text1}
        // {...console.log('state.selectedOption', state.selectedOption)}
      />
      <SelectionOption
        className="selection-option-instance"
        onClick={() => {
          dispatch("click_29");
          handleClick('two');
        }}
        // onClick={() => handleClick("two")}
        optionText={state.selectedOption === "two" ? "Select Option" : undefined}
        stateProp={state.selectedOption === "two" ? "selected" : "default"}
        text={text2}
        // {...console.log('state.selectedOption', state.selectedOption)}
      />
      <SelectionOption
        className="selection-option-instance"
        onClick={() => {
          dispatch("click_32");
          handleClick('three');
        }}
        // onClick={() => handleClick("three")}
        optionText={state.selectedOption === "three" ? "Select Option" : undefined}
        stateProp={state.selectedOption === "three" ? "selected" : "default"}
        text={text3}
        // {...console.log('state.state', state.state)}
        // {...console.log('state.selectedOption', state.selectedOption)}
      />
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "click":
      return {
        selectedOption: "one",
      };

    case "click_29":
      return {
        selectedOption: "two",
      };

    case "click_32":
      return {
        selectedOption: "three",
      };

    
  }
  return state;
}
// function reducer(state, action) {
//   if (state.selectedOption === "none") {
//     switch (action) {
//       case "click":
//         return {
//           selectedOption: "one",
//         };

//       case "click_29":
//         return {
//           selectedOption: "two",
//         };

//       case "click_32":
//         return {
//           selectedOption: "three",
//         };
//     }
//   }

//   if (state.selectedOption === "one") {
//     switch (action) {
//       case "click":
//         return {
//           selectedOption: "one",
//         };

//       case "click_29":
//         return {
//           selectedOption: "two",
//         };

//       case "click_32":
//         return {
//           selectedOption: "three",
//         };
//     }
//   }

//   if (state.selectedOption === "two") {
//     switch (action) {
//       case "click":
//         return {
//           selectedOption: "one",
//         };

//       case "click_29":
//         return {
//           selectedOption: "two",
//         };

//       case "click_32":
//         return {
//           selectedOption: "three",
//         };
//     }
//   }

//   if (state.selectedOption === "three") {
//     switch (action) {
//       case "click":
//         return {
//           selectedOption: "one",
//         };

//       case "click_29":
//         return {
//           selectedOption: "two",
//         };

//       case "click_32":
//         return {
//           selectedOption: "three",
//         };
//     }
//   }

//   return state;
// }


SingleChoice.propTypes = {
  selectedOption: PropTypes.oneOf(["two", "none", "three", "one"]),
  selectionOptionText: PropTypes.string,
  selectionOptionText1: PropTypes.string,
  selectionOptionText2: PropTypes.string,
};
