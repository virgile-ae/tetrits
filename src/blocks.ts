// Manipulating blocks
import { drawNext } from "./canvasManipulation.js";
import { randomTetrimino } from "./game.js";
import { EDirection, ETetrimino, I, J, L, T, S, Z, O } from "./tetrimino.js";

/**
 * The type that represents the active tetrimino
 */
export type ActiveTetrimino = {
	X: number;
	Y: number;
	Direction: EDirection;
	Type: ETetrimino;
	Blocks: ActiveBlock[];
}

/**
 * The type that represents a block of the active tetrimino
 */
export type ActiveBlock = {
	X: number;
	Y: number;
}

/**
 * A function to facilitate making new ActiveBlock objects
 */
export const newActiveBlock = (x: number, y: number): ActiveBlock => {
	return {X: x, Y: y};
}

/**
 * The piece that the user can currently interact with
 */
export let Tetrimino: ActiveTetrimino;

/**
 * Allows other modules to set Tetrimino
 */
export const setTetrimino = (tetrimino: ActiveTetrimino) => {
	Tetrimino = tetrimino;
}

/**
 * The next tetrimino to be dropped
 */
export let nextTetrimino = randomTetrimino();

/**
 * The type that represents the now unactive blocks that have landed
 */
export type InactiveBlock = {
	X: number;
	Y: number;
	Color: string;
};

/**
 * It is list of all inactive blocks
 */
export let inactiveBlocks: InactiveBlock[] = [];

/**
 * Allows other modules to set inactiveBlocks
 */
export const setInactiveBlocks = (blocks: InactiveBlock[]): void => {
	inactiveBlocks = blocks;
}

/**
 * Generates a new Tetrimino
 */
export const newTetrimino = (): void => {
	const x = 5;
	const y = -2;
	const direction = EDirection.Up;
	Tetrimino = {
		X: x,
		Y: y,
		Direction: direction,
		Type: nextTetrimino,
		Blocks: findActiveBlocks(x, y, direction, nextTetrimino)
	}
	nextTetrimino = randomTetrimino();
	drawNext();
}

/**
 * This is for when the piece lands
 * New activePiece and activeBlocks will be needed to be generated and so on
 */
export const disactivateBlocks = (): void => {
	for (let i of Tetrimino.Blocks) {
		inactiveBlocks.push({
			X: i.X,
			Y: i.Y,
			Color: Tetrimino.Type
		});
	}
}

/**
 * Calculates where the other blocks are for the active piece
 */
export const findActiveBlocks = (X: number, Y: number, Direction: EDirection, type: ETetrimino): ActiveBlock[] => {
	switch (type) {
		case ETetrimino.I:
			return I(X, Y, Direction);
		case ETetrimino.J:
			return J(X, Y, Direction);
		case ETetrimino.L:
			return L(X, Y, Direction);
		case ETetrimino.T:
			return T(X, Y, Direction);
		case ETetrimino.S:
			return S(X, Y, Direction);
		case ETetrimino.Z:
			return Z(X, Y, Direction);
		default:
			return O(X, Y, Direction);
	}
}