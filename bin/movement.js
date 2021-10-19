import { Tetrimino, findActiveBlocks, inactiveBlocks, disactivateBlocks, newTetrimino } from "./blocks.js";
import { drawAllBlocks } from "./canvasManipulation.js";
import { hasUnderneath } from "./game.js";
import { handleFullRows } from "./rows.js";
import { EDirection } from "./tetrimino.js";
let stopLock = false;
export const shiftTetrimino = (direction) => {
    const original = Object.assign({}, Tetrimino);
    switch (direction) {
        case EDirection.Down:
            Tetrimino.Y++;
            break;
        case EDirection.Left:
            Tetrimino.X--;
            break;
        case EDirection.Right:
            Tetrimino.X++;
            break;
    }
    Tetrimino.Blocks = findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
    if (checkSame(Tetrimino.Blocks) || !isInMatrix(Tetrimino.Blocks)) {
        newTetrimino();
        return;
    }
    drawAllBlocks();
    if (hasUnderneath(Tetrimino.Blocks))
        stopLock = true;
    if (stopLock) {
        stopLock = false;
        disactivateBlocks();
        newTetrimino();
        handleFullRows();
    }
};
export const rotateTetrimino = () => {
    const original = Tetrimino;
    if (Tetrimino.Direction !== 270) {
        Tetrimino.Direction += 90;
    }
    else {
        Tetrimino.Direction = 0;
    }
    Tetrimino.Blocks = findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
    drawAllBlocks();
};
export const checkSame = (blocks) => {
    blocks.forEach((i) => {
        inactiveBlocks.forEach((j) => {
            if (i.X === j.X && i.Y === j.Y)
                return true;
        });
    });
    return false;
};
export const isInMatrix = (blocks) => {
    blocks.forEach((i) => {
        if (i.X < 0 || i.X > 9)
            return false;
    });
    return true;
};
