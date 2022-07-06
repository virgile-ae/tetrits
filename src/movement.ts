import {
  findActiveBlocks,
  disactivateBlocks,
  newTetrimino,
  ActiveTetrimino,
} from "./blocks.js";
import { drawNewFrame } from "./canvasManipulation.js";
import { isOverlapping, hasLost, hasUnderneath, isInMatrix } from "./checks.js";
import { handleLoss } from "./game.js";
import { handleFullRows } from "./rows.js";
import { addToScore } from "./score.js";
import { state, updateState } from "./state.js";
import { EDirection } from "./tetrimino.js";

const handleLanded = (): void => {
  if (!hasUnderneath(state.Tetrimino.Blocks)) {
    updateState({
      canMoveDown: true,
    });
    return;
  }
  disactivateBlocks();
  if (hasLost()) return handleLoss();
  // Checks for full rows
  handleFullRows();
  // Creates a new tetrimino
  newTetrimino();
  updateState({
    canMoveDown: true,
  });
};

const handleUnderneath = (): void => {
  updateState({
    canMoveDown: false,
  });
  const shiftedLeft = findActiveBlocks(
    state.Tetrimino.X - 1,
    state.Tetrimino.Y,
    state.Tetrimino.Direction,
    state.Tetrimino.Type
  );
  const shiftedRight = findActiveBlocks(
    state.Tetrimino.X + 1,
    state.Tetrimino.Y,
    state.Tetrimino.Direction,
    state.Tetrimino.Type
  );

  const blockedByAnInactiveBlocks =
    isOverlapping(shiftedLeft) || isOverlapping(shiftedRight);
  const blockedByBothInactiveBlocks =
    isOverlapping(shiftedLeft) && isOverlapping(shiftedRight);
  const blockedByASide = !(isInMatrix(shiftedLeft) && isInMatrix(shiftedRight));

  if (
    (blockedByAnInactiveBlocks && blockedByASide) ||
    blockedByBothInactiveBlocks
  ) {
    handleLanded();
  } else if (!state.hasBeenDropped) {
    setTimeout(handleLanded, 500);
  } else {
    handleLanded();
  }
};

/**
 * Shifts the piece in a direction and performs necessary checks
 * Also disactivates the tetrimino if it has landed
 * @param direction The direction in which the piece is to be shifted.
 */
export const shiftTetrimino = (direction: EDirection): void => {
  drawNewFrame();
  const original = Object.assign({}, state.Tetrimino);
  switch (direction) {
    case EDirection.Down:
      if (!state.canMoveDown) return;
      state.Tetrimino.Y++;
      break;
    case EDirection.Left:
      state.Tetrimino.X--;
      break;
    case EDirection.Right:
      state.Tetrimino.X++;
      break;
  }
  state.Tetrimino.Blocks = findActiveBlocks(
    state.Tetrimino.X,
    state.Tetrimino.Y,
    state.Tetrimino.Direction,
    state.Tetrimino.Type
  );
  // Blocks moving into other pieces or out of the matrix
  if (
    isOverlapping(state.Tetrimino.Blocks) ||
    !isInMatrix(state.Tetrimino.Blocks)
  )
    return updateState({ Tetrimino: original });
  if (direction === EDirection.Down) addToScore(1);
  // Only needs to check if there is something underneath if it can move down
  if (state.canMoveDown && hasUnderneath(state.Tetrimino.Blocks))
    handleUnderneath();
};

/**
 * Rotates the active piece clockwise
 */
export const rotateTetrimino = (): void => {
  drawNewFrame();
  // A copy of the original tetrimino
  const original = Object.assign({}, state.Tetrimino);

  // Rotating it by 90deg
  if (state.Tetrimino.Direction !== 270) {
    state.Tetrimino.Direction += 90;
  } else {
    state.Tetrimino.Direction = 0;
  }
  // Calculating the active blocks
  state.Tetrimino.Blocks = findActiveBlocks(
    state.Tetrimino.X,
    state.Tetrimino.Y,
    state.Tetrimino.Direction,
    state.Tetrimino.Type
  );
  // If at least one of the blocks is outside of or ontop of another block, it resets the tetrimino
  if (
    isOverlapping(state.Tetrimino.Blocks) ||
    !isInMatrix(state.Tetrimino.Blocks)
  )
    return updateState({
      Tetrimino: original,
    });
  if (hasUnderneath(state.Tetrimino.Blocks)) handleUnderneath();
};

/**
 * Calculates the position of a hard dropped tetrimino
 * @returns The position of the hard dropped tetrimino
 */
export const hardDroppedTetrimino = (): ActiveTetrimino => {
  const copy = Object.assign({}, state.Tetrimino);
  while (!hasUnderneath(copy.Blocks)) {
    copy.Y++;
    copy.Blocks = findActiveBlocks(copy.X, copy.Y, copy.Direction, copy.Type);
  }
  return copy;
};

export const dropTetrimino = () => {
  drawNewFrame();
  const original = Object.assign({}, state.Tetrimino);
  const dropped = hardDroppedTetrimino();
  updateState({
    Tetrimino: dropped,
    hasBeenDropped: true,
  });
  // Blocks moving into other pieces or out of the matrix
  addToScore(dropped.Y - original.Y);
  // Only needs to check if there is something underneath if it can move down
  // if (canMoveDown && hasUnderneath(Tetrimino.Blocks)) handleUnderneath();
};
