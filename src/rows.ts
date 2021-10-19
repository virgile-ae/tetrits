import { level } from "./level.js";
import { InactiveBlock, inactiveBlocks, setInactiveBlocks } from "./blocks.js";
import { addToScore } from "./score.js";

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
};

/**
 * The total number of rows that have been completed during the entirety of the game
 */
export let totalClearedRows = 0;

/**
 * Updates clearedRows on screen
 */
export const displayTotalClearedRows = (): void => {
	let displayedClearedRows = document.getElementById("clearedRows") as HTMLHeadingElement;
	displayedClearedRows.innerHTML = `Cleared Rows: ${totalClearedRows}`;
}

/**
 * Checks every row in grid to see if has been cleared and awards the necessary points according to the original nintendo scoring system: https://tetris.fandom.com/wiki/Scoring
 * If rows have been cleared, clearedRows and totalClearedRows are incremented
 * It then removes the cleared rows and replaced them with the full ones at the top
 * To be used after the current active block has landed.
 */
export const handleFullRows = (): void => {
	let remove: number[] = [];

	for (let y = 0; y < 20; y++) {
		// All the blocks that are on that row
		let row = inactiveBlocks.filter((i: InactiveBlock) => i.Y === y);
		// If there are ten blocks on that row
		if (row.length === 10) {
			clearedRows++;
			totalClearedRows++;
 			remove.push(y);
		}
	}

	if (remove.length === 0) return;

	clearedRows += remove.length;
	totalClearedRows += remove.length;

	setInactiveBlocks(inactiveBlocks.filter((i: InactiveBlock) => {
		remove.forEach((j: number) => {
			if (i.Y === j) return true;
		})
		return false;
	}));
	
	// TODO: Need to move all inactive blocks above it down

	displayTotalClearedRows();

	switch (remove.length) {
		case 1:
			addToScore(40 * level+1);
			break;
		case 2:
			addToScore(100 * level+1);
			break;
		case 3:
			addToScore(300 * level+1);
			break;
		case 4:
			addToScore(1200 * level+1);
			break;
	}

};