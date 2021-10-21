// Contains all of the functions that are used to draw to the canvas
import { inactiveBlocks, InactiveBlock, Tetrimino, nextTetrimino, findActiveBlocks } from "./blocks.js";
import { EDirection, ETetrimino } from "./tetrimino.js";
import { virtualToActual, blockLen, virtualHeight, virtualWidth } from "./virtualGrid.js";

// Getting canvas element from DOM
const mainCanvas = document.getElementById("matrix") as HTMLCanvasElement;
const mainCtx = mainCanvas.getContext("2d") as CanvasRenderingContext2D;

const nextCanvas = document.getElementById("next") as HTMLCanvasElement;
const nextCtx = nextCanvas.getContext("2d") as CanvasRenderingContext2D;


/**
 * Draws a block using coordinates from the virtual canvas
 * @param virtualX The virtual x coordinate for the block
 * @param virtualY The virtual y coordinate for the block
 * @param color The color of the block
 */
export const drawBlock = (virtualX: number, virtualY: number, color: string, main: boolean): void => {
	const actualX = virtualToActual(virtualX);
	const actualY = virtualToActual(virtualY);

	const canvas = main ? mainCtx : nextCtx;
	canvas.fillStyle = color;
	canvas.fillRect(actualX, actualY, blockLen, blockLen);
};

/**
 * Clears the screen to allow for a new frame to be drawn
 */
export const clearScreen = (): void => {
	mainCtx.fillStyle = "black";
	mainCtx.fillRect(0, 0, virtualWidth * blockLen, virtualHeight * blockLen);
}

/**
 * Displays the tetrimino on the canvas
 */
export const drawTetrimino = (): void => {
	for (let i of Tetrimino.Blocks) {
		drawBlock(i.X, i.Y, Tetrimino.Type, true);
	}
}

/**
 * Displays inactive blocks on the canvas
 */
export const drawInactiveBlocks = (): void => {
	for (let i of inactiveBlocks) {
		drawBlock(i.X, i.Y, i.Color, true);
	}
}


/**
 * Draws all blocks on the screen
 */
export const drawAllBlocks = (): void => {
	requestAnimationFrame(() => {
		clearScreen();
		drawTetrimino();
		drawInactiveBlocks();
	});
}

/**
 * Writes text to the virtual coordinates on the matrix
 * @param x The x coordinate on the virtual matrix
 * @param y The y coordinate on the virtual matrix
 * @param text The text that is to be written to the screen
 */
export const write = (x: number, y: number, text: string) => {
	const actualX = virtualToActual(x);
	const actualY = virtualToActual(y);
	mainCtx.font = "30px Consolas";
	mainCtx.fillStyle = "white";
	mainCtx.fillText(text, actualX, actualY);
}

/**
 * Draws the next block on screen
 */
export const drawNext = (): void => {
	nextCtx.fillStyle = "black";
	nextCtx.fillRect(0, 0, 200, 200);
	for (let i of findActiveBlocks(3, 2, EDirection.Up, nextTetrimino)) {
		drawBlock(i.X, i.Y, nextTetrimino, false);
	}
}