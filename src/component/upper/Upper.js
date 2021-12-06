import React from "react";
import CountDownTimer from './Counter'
import { useSelector, useDispatch } from "react-redux";
import BackButton from "./BackButton";
import RandomButton from "./RandomButton";
import { back } from "../../store/action";

function Upper({ move, modalClosed, resetTimer, setTime, mins, secs }) {
  const dispatch = useDispatch();
  const stackArray = useSelector((state) => state.stackArray);
  const numberOfRow = useSelector((state) => state.boxNumber);
  const stateArray = useSelector((state) => state.stateArray);

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

  // Back Handler
  const backHandler = () => {
    if (stackArray.length === 0) {
      return;
    }
    dispatch(back());
    resetTimer();
  };

  return (
    <div className="middle-grid-vs-clock">
      <span style={{ fontSize: "150px" }}>vs</span>
      <div className="middle-grid-vs-clock-bottom">
        <RandomButton randomHandler={randomHandler}/>
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
        <BackButton backHandler={backHandler}/>
      </div>
    </div>
  );
}

export default Upper;
