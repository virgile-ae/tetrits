import { clearedRows, setClearedRows } from "./rows.js";

/**
 * The level on which the user is currently
 */
export let level = 0;

let requiredRows = (level + 1) * 10;

/**
 * Checks if the required number of completed rows has been met, then resets completedRows and increments level
 */
export const checkLevel = (): void => {
	// Max level is 29
	if (level == 29) return;
	if (clearedRows >= requiredRows) {
		setClearedRows(clearedRows - requiredRows);
		// Increments level
		requiredRows = (++level + 1) * 10;
	}
}

/**
 * Updates the level on screen
 */
export const updateLevel = () => {
	let displayedLevel = document.getElementById("level") as HTMLHeadingElement;
	displayedLevel.innerHTML = "Level: ${level}";
}