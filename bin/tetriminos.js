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
export const I = (x, y) => {
    return [
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y)
    ];
};
export const J = (x, y) => {
    return [
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y)
    ];
};
export const L = (x, y) => {
    return [
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y)
    ];
};
export const T = (x, y) => {
    return [
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y)
    ];
};
export const S = (x, y) => {
    return [
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y)
    ];
};
export const Z = (x, y) => {
    return [
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y),
        newActiveBlock(x, y)
    ];
};
export const O = (x, y) => {
    return [
        newActiveBlock(x, y),
        newActiveBlock(x - 1, y),
        newActiveBlock(x, y + 1),
        newActiveBlock(x - 1, y + 1)
    ];
};
export const drawI = (virtualX, virtualY, direction) => {
    const color = "cyan";
    drawBlock(virtualX, virtualY, color);
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            drawBlock(virtualX - 2, virtualY, color);
            drawBlock(virtualX - 1, virtualY, color);
            drawBlock(virtualX + 1, virtualY, color);
            break;
        default:
            drawBlock(virtualX, virtualY - 1, color);
            drawBlock(virtualX, virtualY + 1, color);
            drawBlock(virtualX, virtualY + 2, color);
            break;
    }
};
export const drawJ = (virtualX, virtualY, direction) => {
    const color = "blue";
    drawBlock(virtualX, virtualY, color);
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            drawBlock(virtualX + 1, virtualY, color);
            drawBlock(virtualX - 1, virtualY, color);
            break;
        default:
            drawBlock(virtualX, virtualY + 1, color);
            drawBlock(virtualX, virtualY - 1, color);
            break;
    }
    switch (direction) {
        case EDirection.Up:
            drawBlock(virtualX + 1, virtualY + 1, color);
            break;
        case EDirection.Down:
            drawBlock(virtualX - 1, virtualY - 1, color);
            break;
        case EDirection.Left:
            drawBlock(virtualX + 1, virtualY - 1, color);
            break;
        case EDirection.Right:
            drawBlock(virtualX - 1, virtualY + 1, color);
            break;
    }
};
export const drawL = (virtualX, virtualY, direction) => {
    const color = "orange";
    drawBlock(virtualX, virtualY, color);
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            drawBlock(virtualX + 1, virtualY, color);
            drawBlock(virtualX - 1, virtualY, color);
            break;
        default:
            drawBlock(virtualX, virtualY + 1, color);
            drawBlock(virtualX, virtualY - 1, color);
            break;
    }
    switch (direction) {
        case EDirection.Up:
            drawBlock(virtualX - 1, virtualY + 1, color);
            break;
        case EDirection.Down:
            drawBlock(virtualX + 1, virtualY - 1, color);
            break;
        case EDirection.Left:
            drawBlock(virtualX + 1, virtualY + 1, color);
            break;
        case EDirection.Right:
            drawBlock(virtualX - 1, virtualY - 1, color);
            break;
    }
};
export const drawT = (virtualX, virtualY, direction) => {
    const color = "purple";
    drawBlock(virtualX, virtualY, color);
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
        case EDirection.Right:
            drawBlock(virtualX - 1, virtualY, color);
            break;
    }
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
        case EDirection.Left:
            drawBlock(virtualX + 1, virtualY, color);
            break;
    }
    switch (direction) {
        case EDirection.Up:
        case EDirection.Right:
        case EDirection.Left:
            drawBlock(virtualX, virtualY + 1, color);
            break;
    }
    switch (direction) {
        case EDirection.Down:
        case EDirection.Right:
        case EDirection.Left:
            drawBlock(virtualX, virtualY - 1, color);
            break;
    }
};
export const drawS = (virtualX, virtualY, direction) => {
    const color = "green";
    drawBlock(virtualX, virtualY, color);
    drawBlock(virtualX + 1, virtualY, color);
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            drawBlock(virtualX, virtualY + 1, color);
            drawBlock(virtualX - 1, virtualY + 1, color);
            break;
        default:
            drawBlock(virtualX, virtualY - 1, color);
            drawBlock(virtualX + 1, virtualY + 1, color);
            break;
    }
};
export const drawZ = (virtualX, virtualY, direction) => {
    const color = "red";
    drawBlock(virtualX, virtualY, color);
    drawBlock(virtualX, virtualY + 1, color);
    switch (direction) {
        case EDirection.Up:
        case EDirection.Down:
            drawBlock(virtualX - 1, virtualY, color);
            drawBlock(virtualX + 1, virtualY + 1, color);
            break;
        default:
            drawBlock(virtualX + 1, virtualY, color);
            drawBlock(virtualX + 1, virtualY - 1, color);
            break;
    }
};
export const drawO = (virtualX, virtualY, direction) => {
    const color = "yellow";
    O(virtualX, virtualY).forEach(i => drawBlock(i.X, i.Y, color));
};
