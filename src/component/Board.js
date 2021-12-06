import React from "react";
import { useSelector } from "react-redux";
import Box from './Box';

function Board({move}) {
  const numberOfRow =  useSelector((state) => state.boxNumber) ;
  const stateArray = useSelector((state) => state.stateArray);

  // render number of boxs from user input
  const renderBox = () => stateArray.map((e, i) => <Box index={i} move={move}/>);

  return (
    <div
      id="board"
      style={{ gridTemplateColumns: `repeat(${numberOfRow}, 1fr)` }}
    >
      {renderBox()}
    </div>
  );
}

export default Board;