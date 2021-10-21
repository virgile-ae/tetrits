import { drawNext } from "./canvasManipulation.js";
import { randomTetrimino } from "./game.js";
import { EDirection, ETetrimino, I, J, L, T, S, Z, O } from "./tetrimino.js";
export const newActiveBlock = (x, y) => {
    return { X: x, Y: y };
};
export let Tetrimino;
export const setTetrimino = (tetrimino) => {
    Tetrimino = tetrimino;
};
export let nextTetrimino = randomTetrimino();
export let inactiveBlocks = [];
export const setInactiveBlocks = (blocks) => {
    inactiveBlocks = blocks;
};
export const newTetrimino = () => {
    const x = 5;
    const y = -2;
    const direction = EDirection.Up;
    Tetrimino = {
        X: x,
        Y: y,
        Direction: direction,
        Type: nextTetrimino,
        Blocks: findActiveBlocks(x, y, direction, nextTetrimino)
    };
    nextTetrimino = randomTetrimino();
    drawNext();
};
export const disactivateBlocks = () => {
    for (let i of Tetrimino.Blocks) {
        inactiveBlocks.push({
            X: i.X,
            Y: i.Y,
            Color: Tetrimino.Type
        });
    }
};
export const findActiveBlocks = (X, Y, Direction, type) => {
    switch (type) {
        case ETetrimino.I:
            return I(X, Y, Direction);
        case ETetrimino.J:
            return J(X, Y, Direction);
        case ETetrimino.L:
            return L(X, Y, Direction);
        case ETetrimino.T:
            return T(X, Y, Direction);
        case ETetrimino.S:
            return S(X, Y, Direction);
        case ETetrimino.Z:
            return Z(X, Y, Direction);
        default:
            return O(X, Y, Direction);
    }
};
