import { Tetrimino, findActiveBlocks, setTetrimino, disactivateBlocks, newTetrimino } from "./blocks.js";
import { drawAllBlocks } from "./canvasManipulation.js";
import { checkSame, hasLost, hasUnderneath, isInMatrix } from "./checks.js";
import { handleLoss } from "./game.js";
import { handleFullRows } from "./rows.js";
import { EDirection, T } from "./tetrimino.js";

/**
 * Shifts the piece in a direction and performs necessary checks
 * Also disactivates the tetrimino if it has landed
 * @param direction The direction in which the piece is to be shifted.
 */
export const shiftTetrimino = (direction: EDirection): void => {
	drawAllBlocks();
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
	// Blocks moving into other pieces or out of the matrix
	if (checkSame(Tetrimino.Blocks) || !isInMatrix(Tetrimino.Blocks)) return setTetrimino(original);
	if (!hasUnderneath(Tetrimino.Blocks)) return;
	// If the tetrimino has something underneath
	disactivateBlocks();
	if (hasLost()) return handleLoss();
	// Checks for full rows
	handleFullRows();
	// Creates a new tetrimino
	newTetrimino();
}

/**
 * Rotates the active piece clockwise
 */
export const rotateTetrimino = (): void => {
	// A copy of the original tetrimino
	const original = Object.assign({}, Tetrimino);
	
	// Rotating it by 90deg
	if (Tetrimino.Direction !== 270) {
		Tetrimino.Direction += 90;
	} else {
		Tetrimino.Direction = 0;
	}
	// Calculating the active blocks
	Tetrimino.Blocks = findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
	// If at least one of the blocks is outside of or ontop of another block, it resets the tetrimino
	if (checkSame(Tetrimino.Blocks) || !isInMatrix(Tetrimino.Blocks)) {
		setTetrimino(original);
	} else {
		drawAllBlocks();
	}
	if (hasUnderneath(Tetrimino.Blocks)) {
		disactivateBlocks();
		handleFullRows();
		newTetrimino();
	}
}