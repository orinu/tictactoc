import { useSelector } from "react-redux";
import React from "react";

const CountDownTimer = (props) => {
  // get state array from redux
  const stateArray = useSelector((state) => state.stateArray);
  // clock move function
  const tick = () => {
    if (props.mins === 0 && props.secs === 0) {
      props.randomHandler();
      props.resetTimer();
    } else if (props.secs === 0) {
      props.setTime([props.mins - 1, 59]);
    } else {
      props.setTime([props.mins, props.secs - 1]);
    }
  };
  // interval for clock move
  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <p>{`${props.mins.toString().padStart(2, "0")}:${props.secs
        .toString()
        .padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDownTimer;
