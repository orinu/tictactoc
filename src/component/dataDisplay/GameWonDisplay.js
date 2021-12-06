import React from "react";
import { useSelector } from "react-redux";

function GameWon({ player }) {
  const player1Won = useSelector((state) => state.player1GameWon);
  const player2Won = useSelector((state) => state.player2GameWon);
  return (
    <div className="player-data">
      <div>
        <span className="title">Game won: </span>
        <span className="data">{player === 1 ? player1Won : player2Won}</span>
      </div>
    </div>
  );
}

export default GameWon;
