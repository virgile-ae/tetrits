// Game logic and functions
import { Tetrimino, findActiveBlocks } from "./blocks.js";
import { clearScreen, write } from "./canvasManipulation.js";
import { handleMovement } from "./controls.js";
import { loop } from "./index.js";
import { shiftTetrimino } from "./movement.js";
import { EDirection, ETetrimino } from "./tetrimino.js";

/**
 * This is a collection of functions that are to be called repeatedly for the game to run
 */
export const gameLoop = (): void => {
	findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
	shiftTetrimino(EDirection.Down);
}

// The bag from which the tetriminos are randomly generated
let bag = [ETetrimino.I, ETetrimino.J, ETetrimino.L, ETetrimino.O, ETetrimino.S, ETetrimino.T, ETetrimino.Z];

/**
 * Randomly generates a new ETetrimino via this method: https://tetris.wiki/Random_Generator
 * @returns A randomly generated ETetrimino
 */
export const randomTetrimino = (): ETetrimino => {
	const index = Math.floor(Math.random() * bag.length);
	let [newTetrimino] = bag.splice(index, 1);
	if (bag.length === 0) bag = [ETetrimino.I, ETetrimino.J, ETetrimino.L, ETetrimino.O, ETetrimino.S, ETetrimino.T, ETetrimino.Z];
	return newTetrimino;
}

/**
 * Handles a game loss
 */
export const handleLoss = (): void => {
	clearInterval(loop);
	document.removeEventListener("keydown", handleMovement);
	(document.getElementById("music") as HTMLAudioElement).pause();
	requestAnimationFrame(() => {
		clearScreen();
		write(2.5, 9.5, "GAME OVER");
	});
}