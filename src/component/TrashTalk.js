import React from "react";
import yourMother from "../utils/youreMother";

function TrashTalk({setMessage}) {
  // Trash Talk Handler
  const trashTalkHandler = () => {
    setMessage(yourMother());
  };

  return (
    <button className="button" onClick={trashTalkHandler}>
      Trash Talk
    </button>
  );
}

export default TrashTalk;
