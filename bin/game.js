import { Tetrimino, inactiveBlocks, ETetrimino, findActiveBlocks } from "./blocks.js";
import { shiftTetrimino } from "./movement.js";
import { EDirection } from "./tetrimino.js";
export const gameLoop = () => {
    findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
    shiftTetrimino(EDirection.Down);
};
export const randomTetrimino = () => {
    const tetriminos = [ETetrimino.I, ETetrimino.J, ETetrimino.L, ETetrimino.O, ETetrimino.S, ETetrimino.T, ETetrimino.Z];
    return tetriminos[Math.floor(Math.random() * 7)];
};
export const hasUnderneath = (blocks) => {
    let temp = false;
    blocks.forEach((i) => {
        if (i.Y >= 19)
            temp = true;
        inactiveBlocks.forEach((j) => {
            if (i.X === j.X && i.Y + 1 === j.Y)
                temp = true;
        });
    });
    return temp;
};
export const hasLost = () => {
    inactiveBlocks.forEach((i) => {
        if (i.Y <= 0)
            return true;
    });
    return false;
};
