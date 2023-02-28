import React from "react";
// hooks
import { useState } from "react";

// this is a simple select box component
const SelectBox = ({ options, changeHandler }) => {
  // hook setup
  const [showOptions, setShowOptions] = useState(false);
  const [current, setCurrent] = useState(0);

  // get the current option
  const selectedOption = options[current];

  // showBoxHandler toggles show options
  const showBoxHandler = () => setShowOptions(!showOptions);

  // setup the classes
  let selectionClasses = `selections`;
  let arrowClasses = `arrow`;
  let optionClasses = `option`;

  // if the toggle is on edit the classes
  if (showOptions) {
    selectionClasses = `selections selections__visible`;
    arrowClasses = `arrow arrow__rotate`;
    optionClasses = `option  option__visible`;
  }

  // map the options to divs
  let selectOptions = options.map((option, index) => {
    return (
      <p
        key={index}
        id={index}
        className={optionClasses}
        onClick={(e) => {
          setCurrent(e.target.id);
          showBoxHandler();
          changeHandler(option);
        }}
      >
        {option}
      </p>
    );
  });

  // return the select box component
  return (
    <div className="selectBox">
      <section className="container" onClick={showBoxHandler}>
        <p className="text">{selectedOption}</p>
        <div className={arrowClasses}>{"<"}</div>
      </section>
      <div className={selectionClasses}>{selectOptions}</div>
    </div>
  );
};

export default SelectBox;
