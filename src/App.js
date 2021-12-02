import React, { useState, useEffect } from "react";
import CountDownTimer from "./component/Counter";
import { useDispatch, connect } from "react-redux";

import Board from "./component/Board";
import Modal from "./component/StartModal";
import TrashTalk from "./component/TrashTalk";
import GameWon from "./component/GameWon";
import ModalWinner from "./component/ModalWinner";
import YourMother from "./component/YourMother";

import * as action from "./store/action";
import { winCondition, tieCheck } from "./utils/winCondition";

import "./App.css";

function App(props) {
  const dispatch = useDispatch();
  const numberOfRow = props.state.boxNumber;
  // Setting Modal
  const [modalClosed, setModalClose] = useState(true);
  // Time
  const min = Math.floor(props.state.time / 60);
  const sec = Math.floor(props.state.time % 60);
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
    if (!props.state.stateArray[divNumber]) {
      dispatch(action.playerMove(divNumber));
      resetTimer();
      setWinner(winCondition());
      setTie(tieCheck());
    }
  };

  // Back Handler
  const backHandler = () => {
    if (props.state.stackArray.length === 0) {
      return;
    }
    dispatch(action.back());
    resetTimer();
  };

  // Random Handler
  const randomHandler = () => {
    if (props.state.stackArray.length === numberOfRow * numberOfRow) {
      return;
    }
    const freeState = props.state.stateArray.reduce((previousValue, currentValue, i) => {
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
        <div className="playerName">
          <span className="title">Name: </span>{" "}
          <span className="data">{props.state.player1Name} </span>
        </div>
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

          <span className="title">Name: </span>
          <span className="data">{props.state.player2Name} </span>
        </div>

        <div className="player-data">
          <GameWon player={1} />
        </div>

        <Board move={move} />

        <div className="player-data">
          <GameWon player={2} />
        </div>

        <div>
          <TrashTalk setMessage={setMessage} />
        </div>
        <YourMother message={message} />
        <div>
          <TrashTalk setMessage={setMessage} />
        </div>
        <div className="footer"></div>
      </div>
      <div> </div>
      {(winner || tie) && <ModalWinner tie={tie} playerName={winner} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(App);
