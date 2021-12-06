import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Board from "./component/Board";
import Modal from "./component/StartModal";
import TrashTalk from "./component/TrashTalk";
import GameWon from "./component/GameWon";
import ModalWinner from "./component/ModalWinner";
import YourMother from "./component/YourMother";
import NameDisplay from "./component/NameDisplay";

import * as action from "./store/action";
import { winCondition, tieCheck } from "./utils/winCondition";

import "./App.css";
import Upper from "./component/upper/Upper";

function App() {
  const dispatch = useDispatch();
  // selectors
  const timeSec = useSelector((state) => state.time);
  const stateArray = useSelector((state) => state.stateArray);

  // Setting Modal
  const [modalClosed, setModalClose] = useState(true);
  // Time
  const min = Math.floor(timeSec / 60);
  const sec = Math.floor(timeSec % 60);
  const [[mins, secs], setTime] = React.useState([min, sec]);
  // Winner
  const [winner, setWinner] = useState(false);
  const [tie, setTie] = useState(false);
  // Trash
  const [message, setMessage] = useState("");
  // Timer reset
  const resetTimer = () => setTime([parseInt(min), parseInt(sec)]);
  // If modal is open reset timer
  useEffect(resetTimer, [modalClosed]);

  // clear timeout
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setMessage("");
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [message]);

  // Player move
  const move = (divNumber) => {
    // if empty
    if (!stateArray[divNumber]) {
      dispatch(action.playerMove(divNumber));
      resetTimer();
      setWinner(winCondition());
      setTie(tieCheck());
    }
  };

  return (
    <div className="App">
      <div className="container">
        <NameDisplay player={1} />
        <Upper move={move} modalClosed={modalClosed} setTime={setTime} resetTimer={resetTimer} setTime={setTime} mins={mins} secs={secs} />
        <Modal resetTimer={resetTimer} setModalClose={setModalClose} />
        <NameDisplay player={2} />
        <GameWon player={1} />
        <Board move={move} />
        <GameWon player={2} />
        <TrashTalk setMessage={setMessage} player={1} />
        <YourMother message={message} />
        <TrashTalk setMessage={setMessage} player={2} />
        <div className="footer"></div>
      </div>
      <div> </div>
      {(winner || tie) && <ModalWinner tie={tie} playerName={winner} />}
    </div>
  );
}

export default App;
