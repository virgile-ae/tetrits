import { Tetrimino, findActiveBlocks, setTetrimino, disactivateBlocks, newTetrimino } from "./blocks.js";
import { drawAllBlocks } from "./canvasManipulation.js";
import { checkSame, hasLost, hasUnderneath, isInMatrix } from "./checks.js";
import { handleLoss } from "./game.js";
import { handleFullRows } from "./rows.js";
import { EDirection } from "./tetrimino.js";
export const shiftTetrimino = (direction) => {
    drawAllBlocks();
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
    if (checkSame(Tetrimino.Blocks) || !isInMatrix(Tetrimino.Blocks))
        return setTetrimino(original);
    if (!hasUnderneath(Tetrimino.Blocks))
        return;
    disactivateBlocks();
    if (hasLost())
        return handleLoss();
    handleFullRows();
    newTetrimino();
};
export const rotateTetrimino = () => {
    const original = Object.assign({}, Tetrimino);
    if (Tetrimino.Direction !== 270) {
        Tetrimino.Direction += 90;
    }
    else {
        Tetrimino.Direction = 0;
    }
    Tetrimino.Blocks = findActiveBlocks(Tetrimino.X, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
    if (checkSame(Tetrimino.Blocks) || !isInMatrix(Tetrimino.Blocks)) {
        setTetrimino(original);
    }
    else {
        drawAllBlocks();
    }
    if (hasUnderneath(Tetrimino.Blocks)) {
        disactivateBlocks();
        handleFullRows();
        newTetrimino();
    }
};
