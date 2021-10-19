import { randomTetrimino } from "./game.js";
import { EDirection, I, J, L, T, S, Z, O } from "./tetrimino.js";
export var ETetrimino;
(function (ETetrimino) {
    ETetrimino["I"] = "lightskyblue";
    ETetrimino["J"] = "darkblue";
    ETetrimino["L"] = "orange";
    ETetrimino["T"] = "magenta";
    ETetrimino["S"] = "green";
    ETetrimino["Z"] = "red";
    ETetrimino["O"] = "yellow";
})(ETetrimino || (ETetrimino = {}));
export const newActiveBlock = (x, y) => {
    return { X: x, Y: y };
};
export let Tetrimino;
export const setTetrimino = (tetrimino) => {
    Tetrimino = tetrimino;
};
export const newTetrimino = () => {
    const x = 5;
    const y = -1;
    const direction = EDirection.Up;
    const tetrimino = randomTetrimino();
    Tetrimino = {
        X: x,
        Y: y,
        Direction: direction,
        Type: tetrimino,
        Blocks: findActiveBlocks(x, y, direction, tetrimino)
    };
};
export let inactiveBlocks = [];
export const setInactiveBlocks = (blocks) => {
    inactiveBlocks = blocks;
};
export const disactivateBlocks = () => {
    Tetrimino.Blocks.forEach((i) => {
        inactiveBlocks.push({
            X: i.X,
            Y: i.Y,
            Color: Tetrimino.Type
        });
    });
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
