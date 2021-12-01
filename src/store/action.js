const START_GAME = "START_GAME";
const PLAYER_MOVE = "PLAYER_MOVE";
const BACK = "BACK";
const RANDOM = "RANDOM";
const INC_PLAYER_1_WIN = "INC_PLAYER_1_WIN";
const INC_PLAYER_2_WIN = "INC_PLAYER_2_WIN";

export const startGame = (gameData) => {
  return {
    type: START_GAME,
    gameData,
  };
};

export const playerMove = (divNumber) => {
  return {
    type: PLAYER_MOVE,
    divNumber,
  };
};

export const back = () => {
  return {
    type: BACK,
  };
};

export const random = () => {
  return {
    type: RANDOM,
  };
};

export const incPlayer1Win = () => {
  return {
    type: INC_PLAYER_1_WIN,
  };
};

export const incPlayer2Win = () => {
  return {
    type: INC_PLAYER_2_WIN,
  };
};
