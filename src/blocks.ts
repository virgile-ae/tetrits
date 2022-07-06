// Manipulating blocks
import { drawNext, findColor } from "./canvasManipulation.js";
import { randomTetrimino } from "./game.js";
import { EDirection, ETetrimino, I, J, L, T, S, Z, O } from "./tetrimino.js";
import { state, updateState } from "./state.js";

/**
 * The type that represents the active tetrimino
 */
export type ActiveTetrimino = {
  X: number;
  Y: number;
  Direction: EDirection;
  Type: ETetrimino;
  Blocks: ActiveBlock[];
};

/**
 * The type that represents a block of the active tetrimino
 */
export class ActiveBlock {
  X: number;
  Y: number;
  constructor(x: number, y: number) {
    this.X = x;
    this.Y = y;
  }
}

/**
 * The type that represents the now unactive blocks that have landed
 */
export type InactiveBlock = {
  X: number;
  Y: number;
  Color: string;
};

/**
 * Generates a new Tetrimino
 */
export const newTetrimino = (): void => {
  const x = 5;
  const y = -2;
  const direction = EDirection.Up;
  updateState({
    Tetrimino: {
      X: x,
      Y: y,
      Direction: direction,
      Type: state.nextTetrimino,
      Blocks: findActiveBlocks(x, y, direction, state.nextTetrimino),
    },
    nextTetrimino: randomTetrimino(),
  });
  drawNext();
  updateState({
    hasBeenDropped: false,
  });
};

/**
 * Pushes all of the active blocks to the inactive blocks
 */
export const disactivateBlocks = (): void => {
  updateState({
    inactiveBlocks: [
      ...state.inactiveBlocks,
      ...state.Tetrimino.Blocks.map((block) => ({
        X: block.X,
        Y: block.Y,
        Color: findColor(state.Tetrimino.Type),
      })),
    ],
  });
};

/**
 * Calculates where the other blocks are for the active piece
 */
export const findActiveBlocks = (
  x: number,
  y: number,
  d: EDirection,
  t: ETetrimino
): ActiveBlock[] => {
  return [I, J, L, T, S, Z, O][t](x, y, d);
};
