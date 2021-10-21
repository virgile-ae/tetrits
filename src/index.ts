import { newTetrimino } from "./blocks.js";
import { drawBlock } from "./canvasManipulation.js";
import { handleKeypress } from "./controls.js";
import { gameLoop } from "./game.js";
import { interval } from "./score.js";

// The initial tetrimino
newTetrimino();
// Listens for keypresses
handleKeypress();

/**
 * The instance of the game loop
 */
export let loop = setInterval(gameLoop, interval);

/**
 * Allows other modules to set loop
 */
export const setLoop = (newLoop: number): void => {
	loop = newLoop;
}
