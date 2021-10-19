import { Tetrimino, inactiveBlocks, ETetrimino, findActiveBlocks, InactiveBlock, disactivateBlocks, ActiveBlock, newTetrimino, ActiveTetrimino } from "./blocks.js";
import { rotateTetrimino, shiftTetrimino } from "./movement.js";
import { EDirection } from "./tetrimino.js";

/**
 * This is a collection of functions that are to be called repeatedly for the game to run.
 */
export const gameLoop = (): void => {
	findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
	shiftTetrimino(EDirection.Down);
};

/**
 * Randomly generates a new ETetrimino
 * @returns A randomly generated ETetrimino
 */
export const randomTetrimino = (): ETetrimino => {
	const tetriminos = [ETetrimino.I, ETetrimino.J, ETetrimino.L, ETetrimino.O, ETetrimino.S, ETetrimino.T, ETetrimino.Z];
	return tetriminos[Math.floor(Math.random() * 7)];
}

/**
 * Checks if there is an inactive block or the floor underneath the tetrimino
 * @returns A boolean that is true if there is something underneath the tetrimino
 */
export const hasUnderneath = (blocks: ActiveBlock[]): boolean => {
	let temp = false;
	blocks.forEach((i: ActiveBlock) => {
		if (i.Y >= 19) temp = true;
		inactiveBlocks.forEach((j: InactiveBlock) => {
			if (i.X === j.X && i.Y+1 === j.Y) temp = true;
		});
	});
	return temp;
}

export const hasLost = (): boolean => {
	inactiveBlocks.forEach((i: InactiveBlock) => {
		if (i.Y <= 0) return true;
	});
	return false;
}