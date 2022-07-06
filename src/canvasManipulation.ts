// Contains all of the functions that are used to draw to the canvas
import {
  inactiveBlocks,
  Tetrimino,
  nextTetrimino,
  findActiveBlocks,
  ActiveBlock,
} from "./blocks.js";
import { hardDroppedTetrimino } from "./movement.js";
import { EDirection, ETetrimino } from "./tetrimino.js";
import {
  virtualToActual,
  blockLen,
  virtualHeight,
  virtualWidth,
} from "./virtualGrid.js";

// Getting canvas element from DOM
export const mainCanvas = document.getElementById(
  "matrix"
) as HTMLCanvasElement;
const mainCtx = mainCanvas.getContext("2d") as CanvasRenderingContext2D;

export const nextCanvas = document.getElementById("next") as HTMLCanvasElement;
const nextCtx = nextCanvas.getContext("2d") as CanvasRenderingContext2D;

export const findColor = (t: ETetrimino) => {
  const colors = [
    "cyan",
    "darkblue",
    "orange",
    "magenta",
    "green",
    "red",
    "yellow",
  ];
  return colors[t];
};

/**
 * Draws a block using coordinates from the virtual matrix
 * @param virtualX The virtual x coordinate for the block
 * @param virtualY The virtual y coordinate for the block
 * @param color The color of the block
 */
export const drawBlock = (
  virtualX: number,
  virtualY: number,
  color: string,
  main: boolean
): void => {
  const actualX = virtualToActual(virtualX);
  const actualY = virtualToActual(virtualY);

  const canvas = main ? mainCtx : nextCtx;
  canvas.fillStyle = color;
  canvas.fillRect(actualX, actualY, blockLen, blockLen);
};

/**
 * A function that could be used to draw lines around the blocks
 * @param ctx The canvas on which to draw the line
 * @param begin The virtual coords from which to start the line
 * @param end The virtual coords from which to finish the line
 */
const drawLine = (
  ctx: CanvasRenderingContext2D,
  begin: ActiveBlock,
  end: ActiveBlock
): void => {
  const beginX = virtualToActual(begin.X);
  const beginY = virtualToActual(begin.Y);
  const endX = virtualToActual(end.X);
  const endY = virtualToActual(end.Y);
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(beginX, beginY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
};

/**
 * Clears the screen to allow for a new frame to be drawn
 */
export const clearScreen = (): void => {
  mainCtx.fillStyle = "black";
  mainCtx.fillRect(0, 0, virtualWidth * blockLen, virtualHeight * blockLen);
};

/**
 * Displays the tetrimino on the matrix
 */
export const drawTetrimino = (): void => {
  Tetrimino.Blocks.forEach((block) =>
    drawBlock(block.X, block.Y, findColor(Tetrimino.Type), true)
  );
};

/**
 * Displays inactive blocks on the matrix
 */
export const drawInactiveBlocks = (): void => {
  inactiveBlocks.forEach((block) =>
    drawBlock(block.X, block.Y, block.Color, true)
  );
};

/**
 * Draws all blocks on the matrix
 */
export const drawNewFrame = (): void => {
  requestAnimationFrame(() => {
    clearScreen();
    drawGhostPiece();
    drawTetrimino();
    drawInactiveBlocks();
  });
};

/**
 * Writes text to the virtual coordinates on the matrix
 * @param x The x coordinate on the virtual matrix
 * @param y The y coordinate on the virtual matrix
 * @param text The text that is to be written to the screen
 */
export const write = (x: number, y: number, text: string) => {
  const actualX = virtualToActual(x);
  const actualY = virtualToActual(y);
  mainCtx.font = "30px Inconsolata";
  mainCtx.fillStyle = "white";
  mainCtx.fillText(text, actualX, actualY);
};

/**
 * Draws the next tetrimino on the matrix
 */
export const drawNext = (): void => {
  nextCtx.fillStyle = "black";
  nextCtx.fillRect(0, 0, 200, 200);
  findActiveBlocks(3, 2, EDirection.Up, nextTetrimino).forEach((block) =>
    drawBlock(block.X, block.Y, findColor(nextTetrimino), false)
  );
};

/**
 * Draws the ghost piece onto the matrix
 */
export const drawGhostPiece = (): void => {
  const ghostPiece = hardDroppedTetrimino();
  ghostPiece.Blocks.forEach((block) => {
    drawBlock(block.X, block.Y, "grey", true);
  });
};
