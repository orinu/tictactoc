import store from "../store/store";

import { incPlayer1Win, incPlayer2Win } from "../store/action";

export function winCondition() {
  const stateArray = store.getState().stateArray;
  const n = parseInt(store.getState().boxNumber);

  for (let i = 0; i < stateArray.length; i++) {
    // check rows
    if (i % n === 0) {
      let check = [];
      for (let j = i; j < i + n; j++) {
        check.push(stateArray[j]);
      }
      if (allTheSame(check)) {
        return declare(check);
      }
    }
    // check column
    if (i < n) {
      let check = [];
      let index = i;
      for (let j = 0; j < n; j++) {
        check.push(stateArray[index]);
        index += n;
      }
      if (allTheSame(check)) {
        return declare(check);
      }
    }
    // check diagonal right to left
    if (i === 0) {
      let check = [];
      let index = 0;
      for (let j = 0; j < n; j++) {
        check.push(stateArray[index]);
        index += n + 1;
      }
      if (allTheSame(check)) {
        return declare(check);
      }
    }
    // check diagonal left to right
    if (i === 0) {
      let check = [];
      let index = n - 1;
      for (let j = 0; j < n; j++) {
        check.push(stateArray[index]);
        index += n - 1;
      }
      if (allTheSame(check)) {
        return declare(check);
      }
    }
  }
}

// check if player won
function allTheSame(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[0] !== array[i] || array[i] === null) {
      return false;
    }
  }
  return true;
}

// declare the winner
function declare(array) {
  const player1Name = store.getState().player1Name;
  const player2Name = store.getState().player2Name;

  if (array[0] === "X") {
    store.dispatch(incPlayer1Win());
    return player1Name;
  }
  store.dispatch(incPlayer2Win());
  return player2Name;
}

// check if tie
export function tieCheck() {
  const stateArray = store.getState().stateArray;
  for (let i = 0; i < stateArray.length; i++) {
    if (stateArray[i] === null) return false;
  }
  return true;
}
