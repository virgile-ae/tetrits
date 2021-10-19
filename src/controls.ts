/* 
 * FEATURES THAT NEED IMPLEMENTING:
 * tapping key to move piece sideways
 * holding key for DAS: https://tetris.wiki/DAS
 */

import { rotateTetrimino, shiftTetrimino } from "./movement.js";
import { EDirection } from "./tetrimino.js";

/**
 * Creates an event listener for keydown 
 */
export const handleKeypress = (): void => {
	// Sleep time in dowhile loop
	const delay = 50;
	document.addEventListener("keydown", (e: KeyboardEvent) => {
		const anyStillDown = (...keys: string[]): boolean => {
			keys.forEach((k) => {
				if (e.code === k) return true;
			});
			return false;
		}
		switch (e.code) {
			case "ArrowDown":
			case "KeyS":
			case "KeyK":
				doWhileWithSleep(() => shiftTetrimino(EDirection.Down), anyStillDown("ArrowDown", "KeyS", "KeyK"), delay);
				break;
			case "ArrowLeft":
			case "KeyA":
			case "KeyJ":
				doWhileWithSleep(() => shiftTetrimino(EDirection.Left), anyStillDown("ArrowLeft", "KeyA", "KeyJ"), delay);
				break;
			case "ArrowRight":
			case "KeyD":
			case "KeyL":
				doWhileWithSleep(() => shiftTetrimino(EDirection.Right), anyStillDown("ArrowRight", "KeyD", "KeyL"), delay);
					break;
			case "ArrowUp":
			case "KeyI":
			case "KeyW":
				doWhileWithSleep(rotateTetrimino, anyStillDown("ArrowUp", "KeyI", "KeyW"), delay);
				break;
		}
	});	
}

/**
 * A custom sleep function
 * @param ms How long the sleep effect should last
 * @returns An empty promise that shouldn't be stored in a variable
 */
export const sleep = async (ms: number): Promise<unknown> => new Promise((res) => setTimeout(res, ms));

/**
 * A custom do while which can sleep
 * @param fn The function that is to be executed in the loop
 * @param condition The condition that decides whether the loop shall run
 * @param ms The duration of the sleep for each loop
 */
export const doWhileWithSleep = async (fn: () => any, condition: boolean, ms: number) => {
	fn()
	await sleep(ms);
	if (condition) doWhileWithSleep(fn, condition, ms);
}
