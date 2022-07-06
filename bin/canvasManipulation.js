import { inactiveBlocks, Tetrimino, nextTetrimino, findActiveBlocks, } from './blocks.js';
import { hardDroppedTetrimino } from './movement.js';
import { EDirection } from './tetrimino.js';
import { virtualToActual, blockLen, virtualHeight, virtualWidth, } from './virtualGrid.js';
export const mainCanvas = document.getElementById('matrix');
const mainCtx = mainCanvas.getContext('2d');
export const nextCanvas = document.getElementById('next');
const nextCtx = nextCanvas.getContext('2d');
export const findColor = (t) => {
    const colors = [
        'cyan',
        'darkblue',
        'orange',
        'magenta',
        'green',
        'red',
        'yellow',
    ];
    return colors[t];
};
export const drawBlock = (virtualX, virtualY, color, main) => {
    const actualX = virtualToActual(virtualX);
    const actualY = virtualToActual(virtualY);
    const canvas = main ? mainCtx : nextCtx;
    canvas.fillStyle = color;
    canvas.fillRect(actualX, actualY, blockLen, blockLen);
};
const drawLine = (ctx, begin, end) => {
    const beginX = virtualToActual(begin.X);
    const beginY = virtualToActual(begin.Y);
    const endX = virtualToActual(end.X);
    const endY = virtualToActual(end.Y);
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(beginX, beginY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
};
export const clearScreen = () => {
    mainCtx.fillStyle = 'black';
    mainCtx.fillRect(0, 0, virtualWidth * blockLen, virtualHeight * blockLen);
};
export const drawTetrimino = () => {
    Tetrimino.Blocks.forEach((block) => drawBlock(block.X, block.Y, findColor(Tetrimino.Type), true));
};
export const drawInactiveBlocks = () => {
    inactiveBlocks.forEach((block) => drawBlock(block.X, block.Y, block.Color, true));
};
export const drawAllBlocks = () => {
    requestAnimationFrame(() => {
        clearScreen();
        drawGhostPiece();
        drawTetrimino();
        drawInactiveBlocks();
    });
};
export const write = (x, y, text) => {
    const actualX = virtualToActual(x);
    const actualY = virtualToActual(y);
    mainCtx.font = '30px Inconsolata';
    mainCtx.fillStyle = 'white';
    mainCtx.fillText(text, actualX, actualY);
};
export const drawNext = () => {
    nextCtx.fillStyle = 'black';
    nextCtx.fillRect(0, 0, 200, 200);
    findActiveBlocks(3, 2, EDirection.Up, nextTetrimino).forEach((i) => drawBlock(i.X, i.Y, findColor(nextTetrimino), false));
};
export const drawGhostPiece = () => {
    const ghostPiece = hardDroppedTetrimino();
    for (const i of ghostPiece.Blocks) {
        drawBlock(i.X, i.Y, 'grey', true);
    }
};
