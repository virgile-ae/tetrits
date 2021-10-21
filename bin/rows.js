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
    let remove = [];
    for (let y = 0; y < virtualHeight; y++) {
        let row = [];
        for (let i of inactiveBlocks) {
            if (i.Y === y)
                row.push(i);
        }
        if (row.length === 10)
            remove.push(y);
    }
    if (remove.length === 0)
        return;
    clearedRows += remove.length;
    totalClearedRows += remove.length;
    let filtered = [];
    outer: for (let i of inactiveBlocks) {
        for (let j of remove) {
            if (i.Y === j)
                continue outer;
            if (i.Y < j)
                i.Y++;
        }
        filtered.push(i);
    }
    setInactiveBlocks(filtered);
    displayedClearedRows.innerHTML = `cleared rows ${totalClearedRows}`;
    let multi;
    switch (remove.length) {
        case 1:
            multi = 40;
            break;
        case 2:
            multi = 100;
            break;
        case 3:
            multi = 300;
            break;
        default:
            multi = 1200;
            break;
    }
    multi *= level;
    addToScore(multi);
    checkLevel();
};
