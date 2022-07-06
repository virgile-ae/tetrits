import { checkAndUpdateLevel } from "./score.js";
import { InactiveBlock } from "./blocks.js";
import { addToScore } from "./score.js";
import { virtualHeight } from "./virtualGrid.js";
import { state, updateState } from "./state.js";

/**
 * The total number of rows that have been completed during the entirety of the game
 */

const displayedClearedRows = document.getElementById(
  "clearedRows"
) as HTMLParagraphElement;

/**
 * Checks every row in grid to see if has been cleared and awards the necessary points according to the original nintendo scoring system: https://tetris.fandom.com/wiki/Scoring
 * TODO: refactor this mess
 */
export const handleFullRows = (): void => {
  let toBeRemoved: number[] = [];
  [...Array(virtualHeight).keys()].forEach((y) => {
    const row = state.inactiveBlocks.filter((i) => i.Y === y);
    if (row.length === 10) toBeRemoved.push(y);
  });
  if (toBeRemoved.length === 0) return;

  updateState({
    clearedRows: state.clearedRows + toBeRemoved.length,
    totalClearedRows: state.totalClearedRows + toBeRemoved.length,
  });

  // TODO: change this
  let filtered: InactiveBlock[] = [];
  outer: for (const i of state.inactiveBlocks) {
    for (const j of toBeRemoved) {
      if (i.Y === j) continue outer;
      if (i.Y < j) i.Y++;
    }
    filtered.push(i);
  }
  updateState({
    inactiveBlocks: filtered,
  });

  displayedClearedRows.innerHTML = `cleared rows ${state.totalClearedRows}`;

  const pointsGained =
    (state.level + 1) * [40, 100, 300, 1200][toBeRemoved.length - 1];
  addToScore(pointsGained);
  checkAndUpdateLevel();
};
