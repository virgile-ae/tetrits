import { newTetrimino } from "./blocks.js";
import { handleKeypress } from "./controls.js";
import { gameLoop } from "./game.js";
import { interval } from "./score.js";
import "./ui.js";
newTetrimino();
handleKeypress();
export let loop = setInterval(gameLoop, interval);
export const setLoop = (newLoop) => {
    loop = newLoop;
};
