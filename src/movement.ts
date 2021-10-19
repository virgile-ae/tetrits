import { Tetrimino, findActiveBlocks, inactiveBlocks, ActiveBlock, setTetrimino, disactivateBlocks, newTetrimino } from "./blocks.js";
import { drawAllBlocks } from "./canvasManipulation.js";
import { hasUnderneath } from "./game.js";
import { handleFullRows } from "./rows.js";
import { EDirection } from "./tetrimino.js";

let stopLock = false;

/**
 * Shifts the piece in a direction
 * @param direction The direction in which the piece is to be shifted.
 */
export const shiftTetrimino = (direction: EDirection) => {
	const original = Object.assign({}, Tetrimino);
	switch (direction) {
		case EDirection.Down:
			Tetrimino.Y++;
			break;
		case EDirection.Left:
			Tetrimino.X--;
			break;
		case EDirection.Right:
			Tetrimino.X++;
			break;
	}
	Tetrimino.Blocks = findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
	if (checkSame(Tetrimino.Blocks) || !isInMatrix(Tetrimino.Blocks)) {
		setTetrimino(original);
		return;
	}
	drawAllBlocks();
	if (hasUnderneath(Tetrimino.Blocks)) {
		disactivateBlocks();
		newTetrimino();
		handleFullRows();
		//checkLevel();	
		//displayTotalClearedRows();
	}
}

/**
 * Rotates the active piece clockwise
 */
export const rotateTetrimino = () => {
	const original = Tetrimino;
	if (Tetrimino.Direction !== 270) {
		Tetrimino.Direction += 90;
	} else {
		Tetrimino.Direction = 0;
	}
	Tetrimino.Blocks = findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
	drawAllBlocks();
}

/**
 * Checks if any of the active and inactive blocks are located in the same spot 
 * @param blocks The blocks to check against the inactiveBlocks
 * @returns A boolean that is true if at least one of the blocks is in the same spot as an inactive block
 */
export const checkSame = (blocks: ActiveBlock[]): boolean => {
	blocks.forEach((i) => {
		inactiveBlocks.forEach((j) => {
			if (i.X === j.X && i.Y === j.Y) return true;
		});
	});
	return false;
}

/**
 * Checks if all of the blocks are within the matrix horizontally
 * @param blocks The blocks to check
 * @returns A boolean that is true if all of the blocks are within the matrix
 */
export const isInMatrix = (blocks: ActiveBlock[]): boolean => {
	blocks.forEach((i) => {
		if (i.X < 0 || i.X > 9) return false;
	});
	return true;
}