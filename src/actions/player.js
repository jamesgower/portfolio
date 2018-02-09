export const addMove = (tiles, currentPlayer) => ({
	type: 'ADD_MOVE',
	tiles,
	currentPlayer
});

export const reset = () => ({
	type: 'RESET'
});

export const setPlayers = (noPlayers) => ({
	type: 'SET_PLAYERS',
	noPlayers
});
