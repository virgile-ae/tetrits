import { Tetrimino, findActiveBlocks, setTetrimino, disactivateBlocks, newTetrimino, ActiveTetrimino } from "./blocks.js";
import { drawAllBlocks } from "./canvasManipulation.js";
import { checkSame, hasLost, hasUnderneath, isInMatrix } from "./checks.js";
import { handleLoss } from "./game.js";
import { handleFullRows } from "./rows.js";
import { addToScore } from "./score.js";
import { EDirection } from "./tetrimino.js";

let canMoveDown = true;

const handleLanded = (): void => {
		if (!hasUnderneath(Tetrimino.Blocks)) {
			canMoveDown = true;
			return;
		}
		disactivateBlocks();
		if (hasLost()) return handleLoss();
		// Checks for full rows
		handleFullRows();
		// Creates a new tetrimino
		newTetrimino();
		canMoveDown = true;
}

const handleUnderneath = (): void => {
	canMoveDown = false;
	const shiftedLeft = findActiveBlocks(Tetrimino.X-1, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
	const shiftedRight = findActiveBlocks(Tetrimino.X+1, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);

	const blockedByAnInactiveBlocks = checkSame(shiftedLeft) || checkSame(shiftedRight);
	const blockedByBothInactiveBlocks = checkSame(shiftedLeft) && checkSame(shiftedRight);
	const blockedByASide = !(isInMatrix(shiftedLeft) && isInMatrix(shiftedRight));

	if ((blockedByAnInactiveBlocks && blockedByASide) || blockedByBothInactiveBlocks) {
		handleLanded();
	} else {
		setTimeout(handleLanded, 500);
	}
}

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
			if (!canMoveDown) return;
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
	if (direction === EDirection.Down) addToScore(1);
	// Only needs to check if there is something underneath if it can move down
	if (canMoveDown && hasUnderneath(Tetrimino.Blocks))	handleUnderneath();
}

/**
 * Rotates the active piece clockwise
 */
export const rotateTetrimino = (): void => {
	drawAllBlocks();
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
	if (checkSame(Tetrimino.Blocks) || !isInMatrix(Tetrimino.Blocks)) return setTetrimino(original);
	if (hasUnderneath(Tetrimino.Blocks)) handleUnderneath();
}

/**
 * Calculates the position of a hard dropped tetrimino
 * @returns The position of the tetrimino if it has been hard dropped
 */
export const calculateHardDrop = (): ActiveTetrimino => {
	const copy = Object.assign({}, Tetrimino);
	while (!hasUnderneath(copy.Blocks)) {
		copy.Y++;
		copy.Blocks = findActiveBlocks(copy.X, copy.Y, copy.Direction, copy.Type);
	}
	return copy;
}