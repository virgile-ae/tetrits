import { Tetrimino, findActiveBlocks, setTetrimino, disactivateBlocks, newTetrimino } from "./blocks.js";
import { drawAllBlocks } from "./canvasManipulation.js";
import { checkSame, hasLost, hasUnderneath, isInMatrix } from "./checks.js";
import { handleLoss } from "./game.js";
import { handleFullRows } from "./rows.js";
import { addToScore } from "./score.js";
import { EDirection } from "./tetrimino.js";
let canMoveDown = true;
const handleLanded = () => {
    if (!hasUnderneath(Tetrimino.Blocks)) {
        canMoveDown = true;
        return;
    }
    disactivateBlocks();
    if (hasLost())
        return handleLoss();
    handleFullRows();
    newTetrimino();
    canMoveDown = true;
};
const handleUnderneath = () => {
    canMoveDown = false;
    const shiftedLeft = findActiveBlocks(Tetrimino.X - 1, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
    const shiftedRight = findActiveBlocks(Tetrimino.X + 1, Tetrimino.Y, Tetrimino.Direction, Tetrimino.Type);
    const blockedByAnInactiveBlocks = checkSame(shiftedLeft) || checkSame(shiftedRight);
    const blockedByBothInactiveBlocks = checkSame(shiftedLeft) && checkSame(shiftedRight);
    const blockedByASide = !(isInMatrix(shiftedLeft) && isInMatrix(shiftedRight));
    if ((blockedByAnInactiveBlocks && blockedByASide) || blockedByBothInactiveBlocks) {
        handleLanded();
    }
    else {
        setTimeout(handleLanded, 500);
    }
};
export const shiftTetrimino = (direction) => {
    drawAllBlocks();
    const original = Object.assign({}, Tetrimino);
    switch (direction) {
        case EDirection.Down:
            if (!canMoveDown)
                return;
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
    if (direction == EDirection.Down)
        addToScore(1);
    if (canMoveDown && hasUnderneath(Tetrimino.Blocks))
        handleUnderneath();
};
export const rotateTetrimino = () => {
    if (!canMoveDown)
        return;
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
export const calculateHardDrop = () => {
    const copy = Object.assign({}, Tetrimino);
    while (!hasUnderneath(copy.Blocks)) {
        copy.Y++;
        copy.Blocks = findActiveBlocks(copy.X, copy.Y, copy.Direction, copy.Type);
    }
    return copy;
};
