import { checkLevel, level } from "./score.js";
import { inactiveBlocks, setInactiveBlocks } from "./blocks.js";
import { addToScore } from "./score.js";
import { virtualHeight } from "./virtualGrid.js";
export let clearedRows = 0;
export const setClearedRows = (num) => {
    clearedRows = num;
};
export let totalClearedRows = 0;
const displayedClearedRows = document.getElementById("clearedRows");
export const handleFullRows = () => {
    let toBeRemoved = [];
    for (let y = 0; y < virtualHeight; y++) {
        let row = [];
        for (let i of inactiveBlocks) {
            if (i.Y === y)
                row.push(i);
        }
        if (row.length === 10)
            toBeRemoved.push(y);
    }
    if (toBeRemoved.length === 0)
        return;
    clearedRows += toBeRemoved.length;
    totalClearedRows += toBeRemoved.length;
    let filtered = [];
    outer: for (let i of inactiveBlocks) {
        for (let j of toBeRemoved) {
            if (i.Y === j)
                continue outer;
            if (i.Y < j)
                i.Y++;
        }
        filtered.push(i);
    }
    setInactiveBlocks(filtered);
    displayedClearedRows.innerHTML = `cleared rows ${totalClearedRows}`;
    let multi = level;
    switch (toBeRemoved.length) {
        case 1:
            multi *= 40;
            break;
        case 2:
            multi *= 100;
            break;
        case 3:
            multi *= 300;
            break;
        default:
            multi *= 1200;
            break;
    }
    addToScore(multi);
    checkLevel();
};
