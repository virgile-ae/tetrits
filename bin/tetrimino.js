import { newActiveBlock } from "./blocks.js";
import { drawBlock } from "./canvasManipulation.js";
export var EDirection;
(function (EDirection) {
    EDirection[EDirection["Up"] = 0] = "Up";
    EDirection[EDirection["Down"] = 180] = "Down";
    EDirection[EDirection["Left"] = 270] = "Left";
    EDirection[EDirection["Right"] = 90] = "Right";
})(EDirection || (EDirection = {}));
;
export const draw = (blocks, color) => {
    blocks.forEach(i => drawBlock(i.X, i.Y, color));
};
export const I = (x, y, direction) => {
    let tempArr = [newActiveBlock(x, y)];
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            tempArr.push(newActiveBlock(x - 2, y), newActiveBlock(x - 1, y), newActiveBlock(x + 1, y));
            return tempArr;
        default:
            tempArr.push(newActiveBlock(x, y - 1), newActiveBlock(x, y + 1), newActiveBlock(x, y + 2));
            return tempArr;
    }
};
export const J = (x, y, direction) => {
    let tempArr = [newActiveBlock(x, y)];
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            tempArr.push(newActiveBlock(x + 1, y), newActiveBlock(x - 1, y));
            break;
        default:
            tempArr.push(newActiveBlock(x, y + 1), newActiveBlock(x, y - 1));
            break;
    }
    switch (direction) {
        case EDirection.Up:
            tempArr.push(newActiveBlock(x + 1, y + 1));
            return tempArr;
        case EDirection.Down:
            tempArr.push(newActiveBlock(x - 1, y - 1));
            return tempArr;
        case EDirection.Left:
            tempArr.push(newActiveBlock(x + 1, y - 1));
            return tempArr;
        case EDirection.Right:
            tempArr.push(newActiveBlock(x - 1, y + 1));
            return tempArr;
    }
};
export const L = (x, y, direction) => {
    let tempArr = [newActiveBlock(x, y)];
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            tempArr.push(newActiveBlock(x + 1, y), newActiveBlock(x - 1, y));
            break;
        default:
            tempArr.push(newActiveBlock(x, y + 1), newActiveBlock(x, y - 1));
            break;
    }
    switch (direction) {
        case EDirection.Up:
            tempArr.push(newActiveBlock(x - 1, y + 1));
            return tempArr;
        case EDirection.Down:
            tempArr.push(newActiveBlock(x + 1, y - 1));
            return tempArr;
        case EDirection.Left:
            tempArr.push(newActiveBlock(x + 1, y + 1));
            return tempArr;
        case EDirection.Right:
            tempArr.push(newActiveBlock(x - 1, y - 1));
            return tempArr;
    }
};
export const T = (x, y, direction) => {
    let tempArr = [newActiveBlock(x, y)];
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
        case EDirection.Right:
            tempArr.push(newActiveBlock(x - 1, y));
    }
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
        case EDirection.Left:
            tempArr.push(newActiveBlock(x + 1, y));
    }
    switch (direction) {
        case EDirection.Up:
        case EDirection.Right:
        case EDirection.Left:
            tempArr.push(newActiveBlock(x, y + 1));
    }
    switch (direction) {
        case EDirection.Down:
        case EDirection.Right:
        case EDirection.Left:
            tempArr.push(newActiveBlock(x, y - 1));
    }
    return tempArr;
};
export const S = (x, y, direction) => {
    let tempArr = [newActiveBlock(x, y), newActiveBlock(x + 1, y)];
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            tempArr.push(newActiveBlock(x, y + 1), newActiveBlock(x - 1, y + 1));
            return tempArr;
        default:
            tempArr.push(newActiveBlock(x, y - 1), newActiveBlock(x + 1, y + 1));
            return tempArr;
    }
};
export const Z = (x, y, direction) => {
    let tempArr = [newActiveBlock(x, y), newActiveBlock(x, y + 1)];
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            tempArr.push(newActiveBlock(x - 1, y), newActiveBlock(x + 1, y + 1));
            return tempArr;
        default:
            tempArr.push(newActiveBlock(x + 1, y), newActiveBlock(x + 1, y - 1));
            return tempArr;
    }
};
export const O = (x, y, direction) => {
    return [
        newActiveBlock(x, y),
        newActiveBlock(x - 1, y),
        newActiveBlock(x, y + 1),
        newActiveBlock(x - 1, y + 1)
    ];
};
