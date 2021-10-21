import { checkLevel, level } from "./score.js";
import { InactiveBlock, inactiveBlocks, setInactiveBlocks } from "./blocks.js";
import { addToScore } from "./score.js";
import { virtualHeight } from "./virtualGrid.js";

/**
 * The number of rows that have been completed in the current level
 */
export let clearedRows = 0;

/**
 * Used to set clearedRows from outside of this module
 * @param num The new value of completedRows
 */
export const setClearedRows = (num: number): void => {
	clearedRows = num;
}

/**
 * The total number of rows that have been completed during the entirety of the game
 */
export let totalClearedRows = 0;

const displayedClearedRows = document.getElementById("clearedRows") as HTMLParagraphElement;

/**
 * Checks every row in grid to see if has been cleared and awards the necessary points according to the original nintendo scoring system: https://tetris.fandom.com/wiki/Scoring
 */
export const handleFullRows = (): void => {
	let remove: number[] = [];

	for (let y = 0; y < virtualHeight; y++) {
		let row: InactiveBlock[] = [];
		for (let i of inactiveBlocks) {
			if (i.Y === y) row.push(i);
		}
		if (row.length === 10) remove.push(y);
	}

	if (remove.length === 0) return;

	clearedRows += remove.length;
	totalClearedRows += remove.length;

	let filtered: InactiveBlock[] = [];
	outer: for (let i of inactiveBlocks) {
		for (let j of remove) {
			if (i.Y === j) continue outer;
			if (i.Y < j) i.Y++;
		}
		filtered.push(i);
	}
	setInactiveBlocks(filtered);

	displayedClearedRows.innerHTML = `cleared rows ${totalClearedRows}`;

	let multi: number;
	switch (remove.length) {
		case 1:
			multi = 40;
			break;
		case 2:
			multi = 100;
			break;
		case 3:
			multi = 300;
			break;
		default:
			multi = 1200;
			break;
	}
	multi *= level;
	addToScore(multi);
	checkLevel();
}