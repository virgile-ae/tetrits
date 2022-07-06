import { drawNext, findColor } from './canvasManipulation.js';
import { randomTetrimino } from './game.js';
import { setHasBeenDropped } from './movement.js';
import { EDirection, I, J, L, T, S, Z, O } from './tetrimino.js';
export class ActiveBlock {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
}
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
        Blocks: findActiveBlocks(x, y, direction, nextTetrimino),
    };
    nextTetrimino = randomTetrimino();
    drawNext();
    setHasBeenDropped(false);
};
export const disactivateBlocks = () => {
    inactiveBlocks.push(...Tetrimino.Blocks.map(block => ({
        X: block.X,
        Y: block.Y,
        Color: findColor(Tetrimino.Type),
    })));
};
export const findActiveBlocks = (x, y, d, t) => {
    return [I, J, L, T, S, Z, O][t](x, y, d);
};
