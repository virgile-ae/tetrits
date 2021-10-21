// A collection of all the checks
import { ActiveBlock, inactiveBlocks, InactiveBlock } from "./blocks.js";

/**
 * Checks if any of the active and inactive blocks are located in the same spot 
 * @param blocks The blocks to check against the inactiveBlocks
 * @returns A boolean that is true if at least one of the blocks is in the same spot as an inactive block
 */
export const checkSame = (blocks: ActiveBlock[]): boolean => {
	for (let i of blocks) {
		for (let j of inactiveBlocks) {
			if (i.X === j.X && i.Y === j.Y) return true;
		}
	}
	return false;
}

/**
 * Checks if all of the blocks are within the matrix horizontally
 * @param blocks The blocks to check
 * @returns A boolean that is true if all of the blocks are within the matrix
 */
export const isInMatrix = (blocks: ActiveBlock[]): boolean => {
	for (let i of blocks) {
		if (i.X < 0 || i.X > 9) return false;
	}
	return true;
}

/**
 * Checks if there is an inactive block or the floor underneath the tetrimino.
 * @returns A boolean that is true if there is something underneath the tetrimino.
 */
export const hasUnderneath = (blocks: ActiveBlock[]): boolean => {
	for (let i of blocks) {
		if (i.Y > 18) return true;
		for (let j of inactiveBlocks) {
			if (i.X === j.X && (i.Y+1) === j.Y) return true;
		}
	}
	return false;
}

/**
 * Checks if the game has been lost.
 * @returns A boolean that is true if the game has been lost.
 */
export const hasLost = (): boolean => {
	for (let i of inactiveBlocks) {
		if (i.Y <= 0) return true;
	}
	return false;
}
