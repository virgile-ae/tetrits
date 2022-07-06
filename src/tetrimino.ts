// Contains functions which calculate the blocks of the tetrimino based on its coordinates, its type and its orientation.
// All of the orientations are based on the 'Original Rotation System' according to this page: https://tetris.wiki/Original_Rotation_System
import { ActiveBlock } from "./blocks.js";

/**
 * All different tetriminos
 */
export enum ETetrimino {
  I,
  J,
  L,
  T,
  S,
  Z,
  O,
}

/**
 * The direction in which the tetrimino is oriented
 */
export enum EDirection {
  // Up is the default direction in which the tetrimino spawns
  Up = 0,
  // Down is a 180 deg rotation of Up
  Down = 180,
  // Left is a 270 deg rotation clockwise of Up
  Left = 270,
  // Right is a 90 deg rotation clockwise of Up
  Right = 90,
}

/**
 * Generates the structure of an I tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const I = (
  x: number,
  y: number,
  direction: EDirection
): ActiveBlock[] => {
  switch (direction) {
    case EDirection.Up:
    case EDirection.Down:
      return [
        new ActiveBlock(x, y),
        new ActiveBlock(x - 2, y),
        new ActiveBlock(x - 1, y),
        new ActiveBlock(x + 1, y),
      ];
    default:
      return [
        new ActiveBlock(x, y),
        new ActiveBlock(x, y - 1),
        new ActiveBlock(x, y + 1),
        new ActiveBlock(x, y + 2),
      ];
  }
};

/**
 * Generates the structure of a J tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const J = (
  x: number,
  y: number,
  direction: EDirection
): ActiveBlock[] => {
  let blocks = [new ActiveBlock(x, y)];
  if (direction === EDirection.Up || direction === EDirection.Down)
    blocks.push(new ActiveBlock(x + 1, y), new ActiveBlock(x - 1, y));
  else blocks.push(new ActiveBlock(x, y + 1), new ActiveBlock(x, y - 1));

  switch (direction) {
    case EDirection.Up:
      return [...blocks, new ActiveBlock(x + 1, y + 1)];
    case EDirection.Down:
      return [...blocks, new ActiveBlock(x - 1, y - 1)];
    case EDirection.Left:
      return [...blocks, new ActiveBlock(x + 1, y - 1)];
    case EDirection.Right:
      return [...blocks, new ActiveBlock(x - 1, y + 1)];
  }
};

/**
 * Generates the structure of a L tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const L = (
  x: number,
  y: number,
  direction: EDirection
): ActiveBlock[] => {
  let blocks = [new ActiveBlock(x, y)];
  if (direction === EDirection.Up || direction === EDirection.Down)
    blocks.push(new ActiveBlock(x + 1, y), new ActiveBlock(x - 1, y));
  else blocks.push(new ActiveBlock(x, y + 1), new ActiveBlock(x, y - 1));

  switch (direction) {
    case EDirection.Up:
      return [...blocks, new ActiveBlock(x - 1, y + 1)];
    case EDirection.Down:
      return [...blocks, new ActiveBlock(x + 1, y - 1)];
    case EDirection.Left:
      return [...blocks, new ActiveBlock(x + 1, y + 1)];
    case EDirection.Right:
      return [...blocks, new ActiveBlock(x - 1, y - 1)];
  }
};

/**
 * Generates the structure of a T tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const T = (
  x: number,
  y: number,
  direction: EDirection
): ActiveBlock[] => {
  let blocks = [new ActiveBlock(x, y)];
  if ([EDirection.Up, EDirection.Down, EDirection.Right].includes(direction))
    blocks.push(new ActiveBlock(x - 1, y));

  if ([EDirection.Up, EDirection.Down, EDirection.Left].includes(direction))
    blocks.push(new ActiveBlock(x + 1, y));

  if ([EDirection.Up, EDirection.Right, EDirection.Left].includes(direction))
    blocks.push(new ActiveBlock(x, y + 1));

  if ([EDirection.Down, EDirection.Right, EDirection.Left].includes(direction))
    blocks.push(new ActiveBlock(x, y - 1));
  return blocks;
};

/**
 * Generates the structure of a S tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const S = (
  x: number,
  y: number,
  direction: EDirection
): ActiveBlock[] => {
  const blocks = [new ActiveBlock(x, y), new ActiveBlock(x + 1, y)];
  if (direction === EDirection.Up || direction === EDirection.Down)
    return [
      ...blocks,
      new ActiveBlock(x, y + 1),
      new ActiveBlock(x - 1, y + 1),
    ];
  else
    return [
      ...blocks,
      new ActiveBlock(x, y - 1),
      new ActiveBlock(x + 1, y + 1),
    ];
};

/**
 * Generates the structure of a Z tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const Z = (
  x: number,
  y: number,
  direction: EDirection
): ActiveBlock[] => {
  const blocks = [new ActiveBlock(x, y), new ActiveBlock(x, y + 1)];
  if (direction === EDirection.Up || direction === EDirection.Down)
    return [
      ...blocks,
      new ActiveBlock(x - 1, y),
      new ActiveBlock(x + 1, y + 1),
    ];
  else
    return [
      ...blocks,
      new ActiveBlock(x + 1, y),
      new ActiveBlock(x + 1, y - 1),
    ];
};

/**
 * Generates the structure of an O tetrimino
 * @param x The x coordinate of the active piece
 * @param y The y coordinate of the active piece
 * @returns The coordinates of each ActiveBlock in the active piece
 */
export const O = (
  x: number,
  y: number,
  _direction?: EDirection
): ActiveBlock[] => {
  return [
    new ActiveBlock(x, y),
    new ActiveBlock(x - 1, y),
    new ActiveBlock(x, y + 1),
    new ActiveBlock(x - 1, y + 1),
  ];
};
