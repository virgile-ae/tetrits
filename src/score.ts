import { gameLoop } from "./game.js";
import { state, updateState } from "./state.js";

// The HTML level and score elements
const displayedScore = document.getElementById("score") as HTMLParagraphElement;
const displayedLevel = document.getElementById("level") as HTMLParagraphElement;

/**
 * Increases the user's score on screen
 * @param newPoints The number of points that the user has just scored
 */
export const addToScore = (newPoints: number): void => {
  updateState({
    score: state.score + newPoints,
  });
  displayedScore.innerHTML = `score ${state.score}`;
};

/**
 * Checks if the required number of completed rows has been met, then resets completedRows and increments level
 */
export const checkAndUpdateLevel = (): void => {
  const requiredRows = 10;
  if (state.level === 19) return;
  if (state.clearedRows >= requiredRows) {
    updateState({
      clearedRows: state.clearedRows - requiredRows,
    });
    displayedLevel.innerHTML = `level ${++state.level}`;
    state.interval *= 0.8;
    clearInterval(state.loop);
    updateState({
      loop: setInterval(gameLoop, state.interval),
    });
  }
};
