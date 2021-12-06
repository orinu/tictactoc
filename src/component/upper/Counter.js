import { useSelector } from "react-redux";
import React from "react";

const CountDownTimer = ({ mins, secs, resetTimer, setTime, randomHandler }) => {
  // get state array from redux
  const stateArray = useSelector((state) => state.stateArray);
  // clock move function
  const tick = () => {
    if (mins === 0 && secs === 0) {
      randomHandler();
      resetTimer();
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };
  // interval for clock move
  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <p>{`${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDownTimer;
