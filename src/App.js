import React, { useState, useEffect } from "react";
import CountDownTimer from "./component/counter";
import { useDispatch, connect } from "react-redux";

import Modal from "./component/StartModal";
import ModalWinner from "./component/ModalWinner";
import * as action from "./store/action";
import { winCondition, tieCheck } from "./utils/winCondition";
import yourMother from "./utils/youreMother";
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
    const timeOut = setTimeout(() => {setMessage("")}, 3000);
    return () => clearTimeout(timeOut);
  }, [message]);

  // render number of boxs from user input
  const renderBox = (boxNumber) => {
    const boxs = [];
    for (let i = 0; i < numberOfRow * numberOfRow; i++) {
      boxs.push(
        <div key={i} className={`box box${i}`} onClick={() => move(i)}>
          <span className="inner-text">{props.state.stateArray[i]}</span>
        </div>
      );
    }
    return boxs;
  };

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
    console.log("stackArray", props.state.stackArray);
    if (props.state.stackArray.length === numberOfRow * numberOfRow) {
      return;
    }
    let freeState = [];
    for (let i = 0; i < props.state.stateArray.length; i++) {
      if (props.state.stateArray[i] === null) {
        freeState.push(i);
      }
    }
    move(freeState[Math.floor(Math.random() * freeState.length)]);
  };

  // Trash Talk Handler
  const trashTalkHandler = () => {
    setMessage(yourMother());
  }

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
            <Modal setModalClose={setModalClose} />
          </div>

          <span className="title">Name: </span>
          <span className="data">{props.state.player2Name} </span>
        </div>

        <div className="player-data">
          <div>
            <span className="title">Game won: </span>
            <span className="data">{props.state.player1GameWon} </span>
          </div>
        </div>

        <div
          id="board"
          style={{ gridTemplateColumns: `repeat(${numberOfRow}, 1fr)` }}
        >
          {renderBox()}
        </div>

        <div className="player-data">
          <div>
            <span className="title">Game won: </span>
            <span className="data">{props.state.player2GameWon}</span>
          </div>
        </div>

        <div>
          <button className="button" onClick={trashTalkHandler}>Trash Talk</button>
        </div>
        <div className="yourMother" >
          {<h2 id="yourMotherData" style={{direction : "rtl"}}>{message}</h2>}
        </div>
        <div>
          <button className="button" onClick={trashTalkHandler}>Trash Talk</button>
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
