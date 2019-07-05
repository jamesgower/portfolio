const defaultPlayerState = {
  noPlayers: undefined,
  playerInfo: [
    {
      name: "",
      counter: "X",
    },
    {
      name: "",
      counter: "O",
      ai: false,
    },
  ],
  difficulty: 2,
};

export default (state = defaultPlayerState, action) => {
  switch (action.type) {
    case "CHANGE_PLAYER_AFTER_MOVE":
      return {
        ...state,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      };
    case "RESET":
      return defaultPlayerState;
    case "SET_NUM_PLAYERS":
      return {
        ...state,
        noPlayers: action.numPlayers,
      };
    case "SETUP_PLAYERS":
      return {
        ...state,
        ...action.setup,
      };
    default:
      return state;
  }
};
