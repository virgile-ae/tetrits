import { inactiveBlocks, Tetrimino, nextTetrimino, findActiveBlocks } from "./blocks.js";
import { EDirection } from "./tetrimino.js";
import { virtualToActual, blockLen, virtualHeight, virtualWidth } from "./virtualGrid.js";
export const mainCanvas = document.getElementById("matrix");
const mainCtx = mainCanvas.getContext("2d");
export const nextCanvas = document.getElementById("next");
const nextCtx = nextCanvas.getContext("2d");
export const drawBlock = (virtualX, virtualY, color, main) => {
    const actualX = virtualToActual(virtualX);
    const actualY = virtualToActual(virtualY);
    const canvas = main ? mainCtx : nextCtx;
    canvas.fillStyle = color;
    canvas.fillRect(actualX, actualY, blockLen, blockLen);
};
export const clearScreen = () => {
    mainCtx.fillStyle = "black";
    mainCtx.fillRect(0, 0, virtualWidth * blockLen, virtualHeight * blockLen);
};
export const drawTetrimino = () => {
    for (let i of Tetrimino.Blocks) {
        drawBlock(i.X, i.Y, Tetrimino.Type, true);
    }
};
export const drawInactiveBlocks = () => {
    for (let i of inactiveBlocks) {
        drawBlock(i.X, i.Y, i.Color, true);
    }
};
export const drawAllBlocks = () => {
    requestAnimationFrame(() => {
        clearScreen();
        drawTetrimino();
        drawInactiveBlocks();
    });
};
export const write = (x, y, text) => {
    const actualX = virtualToActual(x);
    const actualY = virtualToActual(y);
    mainCtx.font = "30px Consolas";
    mainCtx.fillStyle = "white";
    mainCtx.fillText(text, actualX, actualY);
};
export const drawNext = () => {
    nextCtx.fillStyle = "black";
    nextCtx.fillRect(0, 0, 200, 200);
    for (let i of findActiveBlocks(3, 2, EDirection.Up, nextTetrimino)) {
        drawBlock(i.X, i.Y, nextTetrimino, false);
    }
};
