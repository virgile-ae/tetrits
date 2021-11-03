import { inactiveBlocks } from "./blocks.js";
export const checkSame = (blocks) => {
    for (let i of blocks) {
        for (let j of inactiveBlocks) {
            if (i.X === j.X && i.Y === j.Y)
                return true;
        }
    }
    return false;
};
export const isInMatrix = (blocks) => {
    for (let i of blocks) {
        if (i.X < 0 || i.X > 9 || i.Y > 19)
            return false;
    }
    return true;
};
export const hasUnderneath = (blocks) => {
    for (let i of blocks) {
        if (i.Y > 18)
            return true;
        for (let j of inactiveBlocks) {
            if (i.X === j.X && (i.Y + 1) === j.Y)
                return true;
        }
    }
    return false;
};
export const hasLost = () => {
    for (let i of inactiveBlocks) {
        if (i.Y <= 0)
            return true;
    }
    return false;
};
