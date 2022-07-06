import { inactiveBlocks } from './blocks.js';
export const isOverlapping = (blocks) => {
    return blocks.some((i) => inactiveBlocks.some((j) => i.X === j.X && i.Y === j.Y));
};
export const isInMatrix = (blocks) => {
    return !blocks.some((i) => i.X < 0 || i.X > 9 || i.Y > 19);
};
export const hasUnderneath = (blocks) => {
    return blocks.some((i) => i.Y > 18 ||
        inactiveBlocks.some((j) => i.X === j.X && i.Y + 1 === j.Y));
};
export const hasLost = () => {
    return inactiveBlocks.some((i) => i.Y <= 0);
};
