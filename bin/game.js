import { Tetrimino, findActiveBlocks } from "./blocks.js";
import { clearScreen, write } from "./canvasManipulation.js";
import { handleMovement } from "./controls.js";
import { loop } from "./index.js";
import { shiftTetrimino } from "./movement.js";
import { EDirection, ETetrimino } from "./tetrimino.js";
export const gameLoop = () => {
    findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
    shiftTetrimino(EDirection.Down);
};
let bag = [ETetrimino.I, ETetrimino.J, ETetrimino.L, ETetrimino.O, ETetrimino.S, ETetrimino.T, ETetrimino.Z];
export const randomTetrimino = () => {
    const index = Math.floor(Math.random() * bag.length);
    let [newTetrimino] = bag.splice(index, 1);
    if (bag.length === 0)
        bag = [ETetrimino.I, ETetrimino.J, ETetrimino.L, ETetrimino.O, ETetrimino.S, ETetrimino.T, ETetrimino.Z];
    return newTetrimino;
};
export const handleLoss = () => {
    clearInterval(loop);
    document.removeEventListener("keydown", handleMovement);
    document.getElementById("music").pause();
    requestAnimationFrame(() => {
        clearScreen();
        write(2.5, 9.5, "GAME OVER");
    });
};
