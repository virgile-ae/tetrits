import { inactiveBlocks, Tetrimino } from "./blocks.js";
import { draw } from "./tetrimino.js";
import { virtualToActual, blockLen, virtualHeight, virtualWidth } from "./virtualGrid.js";
export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const drawBlock = (virtualX, virtualY, color) => {
    const actualX = virtualToActual(virtualX);
    const actualY = virtualToActual(virtualY);
    ctx.fillStyle = color;
    ctx.fillRect(actualX, actualY, blockLen, blockLen);
};
export const clearScreen = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, virtualWidth * blockLen, virtualHeight * blockLen);
};
export const drawInactiveBlocks = () => {
    inactiveBlocks.forEach((i) => {
        drawBlock(i.X, i.Y, i.Color);
    });
};
export const drawTetrimino = () => {
    draw(Tetrimino.Blocks, Tetrimino.Type);
};
export const drawAllBlocks = () => {
    requestAnimationFrame(() => {
        clearScreen();
        drawTetrimino();
        drawInactiveBlocks();
    });
};
