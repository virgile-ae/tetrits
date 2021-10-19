import { newTetrimino } from "./blocks.js";
import { handleKeypress } from "./controls.js";
import { gameLoop } from "./game.js";
import { displayTotalClearedRows } from "./rows.js";
import { addToScore } from "./score.js";

displayTotalClearedRows();
addToScore(0);
newTetrimino();
let interval = setInterval(gameLoop, 800);
handleKeypress();