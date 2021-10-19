import { level } from "./level.js";
import { inactiveBlocks, setInactiveBlocks } from "./blocks.js";
import { addToScore } from "./score.js";
export let clearedRows = 0;
export const setClearedRows = (num) => {
    clearedRows = num;
};
export let totalClearedRows = 0;
export const displayTotalClearedRows = () => {
    let displayedClearedRows = document.getElementById("clearedRows");
    displayedClearedRows.innerHTML = `Cleared Rows: ${totalClearedRows}`;
};
export const handleFullRows = () => {
    let remove = [];
    for (let y = 0; y < 20; y++) {
        let row = inactiveBlocks.filter((i) => i.Y === y);
        if (row.length === 10) {
            clearedRows++;
            totalClearedRows++;
            remove.push(y);
        }
    }
    if (remove.length === 0)
        return;
    clearedRows += remove.length;
    totalClearedRows += remove.length;
    setInactiveBlocks(inactiveBlocks.filter((i) => {
        remove.forEach((j) => {
            if (i.Y === j)
                return true;
        });
        return false;
    }));
    displayTotalClearedRows();
    switch (remove.length) {
        case 1:
            addToScore(40 * level + 1);
            break;
        case 2:
            addToScore(100 * level + 1);
            break;
        case 3:
            addToScore(300 * level + 1);
            break;
        case 4:
            addToScore(1200 * level + 1);
            break;
    }
};
