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
export const randomTetrimino = () => {
    const tetriminos = [ETetrimino.I, ETetrimino.J, ETetrimino.L, ETetrimino.O, ETetrimino.S, ETetrimino.T, ETetrimino.Z];
    return tetriminos[Math.floor(Math.random() * 7)];
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
