/**
 * All of the orientations are based on the 'Original Rotation System' according to this link: https://tetris.wiki/Original_Rotation_System
 */

import { ActiveBlock, newActiveBlock } from "./blocks.js";
import { drawBlock } from "./canvasManipulation.js";

/** 
 * EDirection informs drawJ, drawL and drawT of which direction the tetrimino is oriented
 */ 
export enum EDirection {
	// Up is the default direction in which the tetrimino spawns
	Up = 0,
	// Down is a 180 deg rotation of Up
	Down = 180,
	// Left is a 90 deg rotation anticlockwise of Up
	Left = 270,
	// Right is a 90 deg rotation clockwise of Up
	Right = 90,
};

/**
 
 * @param blocks The blocks that are to be drawn to the screen
 * @param color The color of the blocks that are to be drawn
 */
export const draw = (blocks: ActiveBlock[], color: string): void => {
	blocks.forEach(i => drawBlock(i.X, i.Y, color));
};

/**
 * Generates the structure of an I tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const I = (x:number, y: number, direction: EDirection): ActiveBlock[] => {
	let tempArr = [newActiveBlock(x, y)];
	switch (direction) {
		case EDirection.Up:
		case EDirection.Down:
			tempArr.push(
				newActiveBlock(x-2, y),
				newActiveBlock(x-1, y),
				newActiveBlock(x+1, y),
			);
			return tempArr;
		default:
			tempArr.push(
				newActiveBlock(x, y-1),
				newActiveBlock(x, y+1),
				newActiveBlock(x, y+2)
			);
			return tempArr;
	}
}

/**
 * Generates the structure of a J tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const J = (x:number, y: number, direction: EDirection): ActiveBlock[] => {
	let tempArr = [newActiveBlock(x, y)];
	switch (direction) {
		case EDirection.Up:
		case EDirection.Down:
			tempArr.push(
				newActiveBlock(x+1, y),
				newActiveBlock(x-1, y),
			);
			break;
		default:
			tempArr.push(
				newActiveBlock(x, y+1),
				newActiveBlock(x, y-1)
			);
			break;
	}

	switch (direction) {
		case EDirection.Up:
			tempArr.push(newActiveBlock(x+1, y+1));
			return tempArr;
		case EDirection.Down:
			tempArr.push(newActiveBlock(x-1, y-1));
			return tempArr;
		case EDirection.Left:
			tempArr.push(newActiveBlock(x+1, y-1));
			return tempArr;
		case EDirection.Right:
			tempArr.push(newActiveBlock(x-1, y+1));
			return tempArr;
	}
}

/**
 * Generates the structure of a L tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const L = (x:number, y: number, direction: EDirection): ActiveBlock[] => {
	let tempArr = [newActiveBlock(x, y)];
	switch (direction) {
		case EDirection.Up:
		case EDirection.Down:
			tempArr.push(
				newActiveBlock(x+1, y),
				newActiveBlock(x-1, y),
			);
			break;
		default:
			tempArr.push(
				newActiveBlock(x, y+1),
				newActiveBlock(x, y-1)
			);
			break;
	}

	switch (direction) {
		case EDirection.Up:
			tempArr.push(newActiveBlock(x-1, y+1));
			return tempArr;
		case EDirection.Down:
			tempArr.push(newActiveBlock(x+1, y-1));
			return tempArr;
		case EDirection.Left:
			tempArr.push(newActiveBlock(x+1, y+1));
			return tempArr;
		case EDirection.Right:
			tempArr.push(newActiveBlock(x-1, y-1));
			return tempArr;
	}
}

/**
 * Generates the structure of a T tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const T = (x:number, y: number, direction: EDirection): ActiveBlock[] => {
	let tempArr = [newActiveBlock(x, y)];

	switch (direction) {
		case EDirection.Up:
		case EDirection.Down:
		case EDirection.Right:
			tempArr.push(newActiveBlock(x-1, y));
	}
	switch (direction) {
		case EDirection.Up:
		case EDirection.Down:
		case EDirection.Left:
			tempArr.push(newActiveBlock(x+1, y));
	}
	switch (direction) {
		case EDirection.Up:
		case EDirection.Right:
		case EDirection.Left:
			tempArr.push(newActiveBlock(x, y+1));
	}
	switch (direction) {
		case EDirection.Down:
		case EDirection.Right:
		case EDirection.Left:
			tempArr.push(newActiveBlock(x, y-1));
	}
	return tempArr;
}

/**
 * Generates the structure of a S tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const S = (x:number, y: number, direction: EDirection): ActiveBlock[] => {
	let tempArr = [newActiveBlock(x, y), newActiveBlock(x+1, y)];
	switch (direction) {
		case EDirection.Up:
		case EDirection.Down:
			tempArr.push(
				newActiveBlock(x, y+1),
				newActiveBlock(x-1, y+1),
			);
			return tempArr;
		default:
			tempArr.push(
				newActiveBlock(x, y-1),
				newActiveBlock(x+1, y+1)
			);
			return tempArr;
	}
}

/**
 * Generates the structure of a Z tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const Z = (x:number, y: number, direction: EDirection): ActiveBlock[] => {
	let tempArr = [newActiveBlock(x, y), newActiveBlock(x, y+1)];
	switch (direction) {
		case EDirection.Up:
		case EDirection.Down:
			tempArr.push(
				newActiveBlock(x-1, y),
				newActiveBlock(x+1, y+1),
			);
			return tempArr;
		default:
			tempArr.push(
				newActiveBlock(x+1, y),
				newActiveBlock(x+1, y-1)
			);
			return tempArr;
	}
}

/**
 * Generates the structure of an O tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const O = (x: number, y: number, direction: EDirection): ActiveBlock[] => {
	return [
		newActiveBlock(x, y),
		newActiveBlock(x-1, y),
		newActiveBlock(x, y+1),
		newActiveBlock(x-1, y+1)
	];
};