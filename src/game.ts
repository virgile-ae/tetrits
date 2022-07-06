// Game logic and functions
import { findActiveBlocks } from "./blocks.js";
import { clearScreen, write } from "./canvasManipulation.js";
import { handleMovement } from "./controls.js";
import { shiftTetrimino } from "./movement.js";
import { state } from "./state.js";
import { EDirection, ETetrimino } from "./tetrimino.js";

/**
 * This is a collection of functions that are to be called repeatedly for the game to run
 */
export const gameLoop = (): void => {
  findActiveBlocks(
    state.Tetrimino.X,
    state.Tetrimino.Y,
    state.Tetrimino.Direction,
    state.Tetrimino.Type
  );
  shiftTetrimino(EDirection.Down);
};

/**
 * Randomly generates a new ETetrimino via this method: https://tetris.wiki/Random_Generator
 * @returns A randomly generated ETetrimino
 */
export const randomTetrimino = (): ETetrimino => {
  const index = Math.floor(Math.random() * state.bag.length);
  let [newTetrimino] = state.bag.splice(index, 1);
  if (state.bag.length === 0)
    state.bag = [
      ETetrimino.I,
      ETetrimino.J,
      ETetrimino.L,
      ETetrimino.O,
      ETetrimino.S,
      ETetrimino.T,
      ETetrimino.Z,
    ];
  return newTetrimino;
};

/**
 * Handles a game loss
 */
export const handleLoss = (): void => {
  clearInterval(state.loop);
  document.removeEventListener("keydown", handleMovement);
  (document.getElementById("music") as HTMLAudioElement).pause();
  requestAnimationFrame(() => {
    clearScreen();
    write(2, 9.5, "GAME OVER");
  });
};
