// A collection of all the checks
import { ActiveBlock, inactiveBlocks } from "./blocks.js";

/**
 * Checks if any of the active and inactive blocks are located in the same spot
 * @param blocks The blocks to check against inactiveBlocks
 * @returns A boolean that is true if at least one of the blocks is in the same spot as an inactive block
 */
export const isOverlapping = (blocks: ActiveBlock[]): boolean => {
  return blocks.some((i) =>
    inactiveBlocks.some((j) => i.X === j.X && i.Y === j.Y)
  );
};

/**
 * Checks if all of the blocks are within the matrix horizontally
 * @param blocks The blocks to check
 * @returns A boolean that is true if all of the blocks are within the matrix
 */
export const isInMatrix = (blocks: ActiveBlock[]): boolean => {
  return !blocks.some((i) => i.X < 0 || i.X > 9 || i.Y > 19);
};

/**
 * Checks if there is an inactive block or the floor underneath the tetrimino.
 * @returns A boolean that is true if there is something underneath the tetrimino.
 */
export const hasUnderneath = (blocks: ActiveBlock[]): boolean => {
  return blocks.some(
    (i) =>
      i.Y > 18 || inactiveBlocks.some((j) => i.X === j.X && i.Y + 1 === j.Y)
  );
};

/**
 * Checks if the game has been lost.
 * @returns A boolean that is true if the game has been lost.
 */
export const hasLost = (): boolean => {
  return inactiveBlocks.some((i) => i.Y <= 0);
};
