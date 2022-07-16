import store from "../store/store";

export default () => {
  const stateArray = store.getState().stateArray;

  let bestScore = Infinity;
  let move;
  for (let i = 0; i < stateArray.length; i++) {
    if (stateArray[i] === null) {
      stateArray[i] = "O";
      let score = minimax(stateArray, true, 0);
      stateArray[i] = null;
      if (score < bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

const score = {
  X: 1,
  O: -1,
  tie: 0,
};

function minimax(board, isMax, depth) {
  let res = winCondition(board);
  if (res) {
    return score[res];
  }

  if (isMax) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "X";
        let score = minimax(board, false, depth + 1);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, true,  depth + 1);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

const winCondition = (stateArray) => {
  const n = parseInt(store.getState().boxNumber);

  for (let i = 0; i < stateArray.length; i++) {
    // check rows
    if (i % n === 0) {
      let check = [];
      for (let j = i; j < i + n; j++) {
        check.push(stateArray[j]);
      }
      if (allTheSame(check)) {
        return check[0];
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
        return check[0];
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
        return check[0];
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
        return check[0];
      }
    }
  }
  for (let i = 0; i < stateArray.length; i++) {
    if (stateArray[i] === null) return false;
  }
  return "tie";
};

// check if player won
const allTheSame = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[0] !== array[i] || array[i] === null) {
      return false;
    }
  }
  return true;
};
