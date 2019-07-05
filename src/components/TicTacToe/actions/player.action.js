export const changePlayer = () => ({
  type: "CHANGE_PLAYER_AFTER_MOVE",
});

export const reset = () => ({
  type: "RESET",
});

export const setNumPlayers = numPlayers => ({
  type: "SET_NUM_PLAYERS",
  numPlayers,
});

export const setupPlayers = setup => ({
  type: "SETUP_PLAYERS",
  setup,
});
