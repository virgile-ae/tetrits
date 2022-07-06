import { ActiveTetrimino, InactiveBlock } from "./blocks.js";
import { gameLoop, randomTetrimino } from "./game.js";
import { ETetrimino } from "./tetrimino.js";

type State = {
  canMoveDown: boolean;
  dark: boolean;
  hasBeenDropped: boolean;
  clearedRows: number;
  interval: number;
  level: number;
  loop: number;
  score: number;
  totalClearedRows: number;
  Tetrimino: ActiveTetrimino;
  nextTetrimino: ETetrimino;
  bag: ETetrimino[];
  inactiveBlocks: InactiveBlock[];
};

const initialState = (): State => ({
  canMoveDown: true,
  dark: false,
  hasBeenDropped: false,
  clearedRows: 0,
  interval: 800,
  level: 0,
  loop: setInterval(gameLoop, 800),
  score: 0,
  totalClearedRows: 0,
  Tetrimino: null,
  nextTetrimino: randomTetrimino(),
  bag: [
    ETetrimino.I,
    ETetrimino.J,
    ETetrimino.L,
    ETetrimino.O,
    ETetrimino.S,
    ETetrimino.T,
    ETetrimino.Z,
  ],
  inactiveBlocks: [],
});

export let state = initialState();

const changeState = (newState: object) => Object.assign(state, newState);

export const updateState = (newState: object): void => {
  state = changeState(newState);
};
