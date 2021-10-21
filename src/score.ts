import { gameLoop } from "./game.js";
import { loop, setLoop } from "./index.js";
import { clearedRows, setClearedRows } from "./rows.js";

/**
 * The user's current score
 */ 
let score = 0;

/**
 * The user's current level
 */
export let level = 0;

// The HTML level and score elements
const displayedScore = document.getElementById("score") as HTMLParagraphElement;
const displayedLevel = document.getElementById("level") as HTMLParagraphElement;

/**
 * Increases the user's score on screen
 * @param newPoints The number of points that the user has just scored
 */
export const addToScore = (newPoints: number): void => {
	score += newPoints;
	displayedScore.innerHTML = `score ${score}`;
}


/**
 * Checks if the required number of completed rows has been met, then resets completedRows and increments level
 */
export const checkLevel = (): void => {
	const requiredRows = 10;
	if (level === 19) return;
	if (clearedRows >= requiredRows) {
		setClearedRows(clearedRows - requiredRows);
		displayedLevel.innerHTML = `level ${++level}`;
		updateSpeed();
	}
}

export let interval = 800;

/**
 * Increases the falling speed of the tetrimino
 */
export const updateSpeed = (): void => {
	interval *= 0.8;
	clearInterval(loop);
	setLoop(setInterval(gameLoop, interval));
}