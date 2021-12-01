const initialState = {
  boxNumber: 3,
  player1Name: "player 1",
  player2Name: "player 2",
  player1GameWon: 0,
  player2GameWon: 0,
  time: 20,
  turnPlayer1: true,
  stateArray: [null, null, null, null, null, null, null, null, null],
  stackArray: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        ...action.gameData,
      };
    case "PLAYER_MOVE":
      const dupStateArray1 = [...state.stateArray];
      dupStateArray1[action.divNumber] = state.turnPlayer1 ? "X" : "O";
      return {
        ...state,
        turnPlayer1: !state.turnPlayer1,
        stateArray: dupStateArray1,
        stackArray: state.stackArray.concat(action.divNumber),
      };
    case "BACK":
      const lastMove = state.stackArray[state.stackArray.length - 1];
      let dup = [...state.stateArray];
      dup[lastMove] = null;
      return {
        ...state,
        turnPlayer1: !state.turnPlayer1,
        stateArray: dup,
        stackArray: state.stackArray.slice(0, state.stackArray.length - 1),
      };
    case "INC_PLAYER_1_WIN":
      return {
        ...state,
        player1GameWon: state.player1GameWon + 1,
      };
    case "INC_PLAYER_2_WIN":
      return {
        ...state,
        player2GameWon: state.player2GameWon + 1,
      };
  }
  return state;
};
