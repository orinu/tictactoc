import React, { useState, useEffect } from "react";
import CountDownTimer from "./component/Counter";
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

function App() {
  const dispatch = useDispatch();
  // selectors
  const timeSec = useSelector((state) => state.time);
  const numberOfRow = useSelector((state) => state.boxNumber);
  const stateArray = useSelector((state) => state.stateArray);
  const stackArray = useSelector((state) => state.stackArray);

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

  // Back Handler
  const backHandler = () => {
    if (stackArray.length === 0) {
      return;
    }
    dispatch(action.back());
    resetTimer();
  };

  // Random Handler
  const randomHandler = () => {
    if (stackArray.length === numberOfRow * numberOfRow) {
      return;
    }
    const freeState = stateArray.reduce((previousValue, currentValue, i) => {
      if (currentValue === null) {
        previousValue.push(i);
      }
      return previousValue;
    }, []);
    move(freeState[Math.floor(Math.random() * freeState.length)]);
  };

  return (
    <div className="App">
      <div className="container">
        <NameDisplay player={1} />
        <div className="middle-grid-vs-clock">
          <span style={{ fontSize: "150px" }}>vs</span>
          <div className="middle-grid-vs-clock-bottom">
            <button className="button" onClick={randomHandler}>
              בחר אקראית
            </button>
            <span style={{ fontSize: "1.4em", alignSelf: "center" }}>
              {modalClosed && (
                <CountDownTimer
                  mins={mins}
                  secs={secs}
                  resetTimer={resetTimer}
                  setTime={setTime}
                  randomHandler={randomHandler}
                />
              )}
            </span>
            <button className="button" onClick={backHandler}>
              צעד אחורה
            </button>
          </div>
        </div>
        <div className="playerName">
          <div id="setting">
            <Modal resetTimer={resetTimer} setModalClose={setModalClose} />
          </div>
          <NameDisplay player={2} />
        </div>
        <div className="player-data">
          <GameWon player={1} />
        </div>
        <Board move={move} />
        <div className="player-data">
          <GameWon player={2} />
        </div>
        <div>
          <TrashTalk setMessage={setMessage} player={1} />
        </div>
        <YourMother message={message} />
        <div>
          <TrashTalk setMessage={setMessage} player={2} />
        </div>
        <div className="footer"></div>
      </div>
      <div> </div>
      {(winner || tie) && <ModalWinner tie={tie} playerName={winner} />}
    </div>
  );
}

export default App;
