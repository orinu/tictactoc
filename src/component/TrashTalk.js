import React from "react";
import yourMother from "../utils/youreMother";
import { useSelector } from "react-redux";

function TrashTalk({ setMessage, player }) {
  const player1Name = useSelector((state) => state.player1Name);
  const player2Name = useSelector((state) => state.player2Name);
  // Trash Talk Handler
  const trashTalkHandler = () => {
    const name = player === 1 ? player2Name + ", " : player1Name + ", "
    setMessage(name + yourMother());
  };

  return (
    <div>
      <button className="button" onClick={trashTalkHandler}>
        Trash Talk
      </button>
    </div>
  );
}

export default TrashTalk;
