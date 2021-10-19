import { inactiveBlocks, InactiveBlock, Tetrimino } from "./blocks.js";
import { draw } from "./tetrimino.js";
import { virtualToActual, blockLen, virtualHeight, virtualWidth } from "./virtualGrid.js";

// Getting canvas element from DOM
export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

/**
 * Draws a block using coordinates from the virtual canvas
 * @param virtualX The virtual x coordinate for the block
 * @param virtualY The virtual y coordinate for the block
 * @param color The color of the block
 */
export const drawBlock = (virtualX: number, virtualY: number, color: string): void => {
	const actualX = virtualToActual(virtualX);
	const actualY = virtualToActual(virtualY);

	ctx.fillStyle = color;
	ctx.fillRect(actualX, actualY, blockLen, blockLen);
};

/**
 * Clears the screen to allow for a new frame to be drawn
 */
export const clearScreen = (): void => {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, virtualWidth * blockLen, virtualHeight * blockLen);
}

/**
 * Displays inactive blocks on the canvas
 */
export const drawInactiveBlocks = (): void => {
	inactiveBlocks.forEach((i: InactiveBlock) => {
		drawBlock(i.X, i.Y, i.Color);
	});
};

/**
 * Draws the active piece on the canvas
 */
export const drawTetrimino = (): void => {
	draw(Tetrimino.Blocks, Tetrimino.Type);
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