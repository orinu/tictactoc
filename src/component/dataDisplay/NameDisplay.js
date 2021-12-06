import React from "react";
import { useSelector } from "react-redux";

function NameDisplay({ player }) {
  const player1Name = useSelector((state) => state.player1Name);
  const player2Name = useSelector((state) => state.player2Name);

  return (
    <div className="playerName">
      <span className="title">Name: </span>{" "}
      <span className="data">{player === 1 ? player1Name : player2Name}</span>
    </div>
  );
}

export default NameDisplay;
