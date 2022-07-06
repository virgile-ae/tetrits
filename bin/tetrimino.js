import { ActiveBlock } from './blocks.js';
export var ETetrimino;
(function (ETetrimino) {
    ETetrimino[ETetrimino["I"] = 0] = "I";
    ETetrimino[ETetrimino["J"] = 1] = "J";
    ETetrimino[ETetrimino["L"] = 2] = "L";
    ETetrimino[ETetrimino["T"] = 3] = "T";
    ETetrimino[ETetrimino["S"] = 4] = "S";
    ETetrimino[ETetrimino["Z"] = 5] = "Z";
    ETetrimino[ETetrimino["O"] = 6] = "O";
})(ETetrimino || (ETetrimino = {}));
export var EDirection;
(function (EDirection) {
    EDirection[EDirection["Up"] = 0] = "Up";
    EDirection[EDirection["Down"] = 180] = "Down";
    EDirection[EDirection["Left"] = 270] = "Left";
    EDirection[EDirection["Right"] = 90] = "Right";
})(EDirection || (EDirection = {}));
export const I = (x, y, direction) => {
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
export const J = (x, y, direction) => {
    let blocks = [new ActiveBlock(x, y)];
    if (direction === EDirection.Up || direction === EDirection.Down)
        blocks.push(new ActiveBlock(x + 1, y), new ActiveBlock(x - 1, y));
    else
        blocks.push(new ActiveBlock(x, y + 1), new ActiveBlock(x, y - 1));
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
export const L = (x, y, direction) => {
    let blocks = [new ActiveBlock(x, y)];
    if (direction === EDirection.Up || direction === EDirection.Down)
        blocks.push(new ActiveBlock(x + 1, y), new ActiveBlock(x - 1, y));
    else
        blocks.push(new ActiveBlock(x, y + 1), new ActiveBlock(x, y - 1));
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
export const T = (x, y, direction) => {
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
export const S = (x, y, direction) => {
    const blocks = [new ActiveBlock(x, y), new ActiveBlock(x + 1, y)];
    if (direction === EDirection.Up || direction === EDirection.Down)
        return [...blocks, new ActiveBlock(x, y + 1), new ActiveBlock(x - 1, y + 1)];
    else
        return [...blocks, new ActiveBlock(x, y - 1), new ActiveBlock(x + 1, y + 1)];
};
export const Z = (x, y, direction) => {
    const blocks = [new ActiveBlock(x, y), new ActiveBlock(x, y + 1)];
    if (direction === EDirection.Up || direction === EDirection.Down)
        return [...blocks, new ActiveBlock(x - 1, y), new ActiveBlock(x + 1, y + 1)];
    else
        return [...blocks, new ActiveBlock(x + 1, y), new ActiveBlock(x + 1, y - 1)];
};
export const O = (x, y, direction) => {
    return [
        new ActiveBlock(x, y),
        new ActiveBlock(x - 1, y),
        new ActiveBlock(x, y + 1),
        new ActiveBlock(x - 1, y + 1),
    ];
};
