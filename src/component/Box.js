import React from "react";
import { useSelector } from "react-redux";

function Box({ index, move }) {
  const stateArray = useSelector((state) => state.stateArray)

  return (
    <div key={index} className={`box box${index}`} onClick={() => move(index)}>
      <span className="inner-text">{stateArray[index]}</span>
    </div>
  );
}

export default Box;