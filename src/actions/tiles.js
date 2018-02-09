export const changeSize = (newBoard, boardSize) => ({
	type: 'CHANGE_SIZE',
	newBoard,
	boardSize
});

export const reset = (boardSize) => ({
	type: 'RESET',
	boardSize
});

export const addMove = (tiles) => ({
	type: 'ADD_MOVE',
	tiles
});