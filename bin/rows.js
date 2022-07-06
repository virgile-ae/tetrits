import { checkAndUpdateLevel, level } from './score.js';
import { inactiveBlocks, setInactiveBlocks } from './blocks.js';
import { addToScore } from './score.js';
import { virtualHeight } from './virtualGrid.js';
export let clearedRows = 0;
export const setClearedRows = (num) => {
    clearedRows = num;
};
export let totalClearedRows = 0;
const displayedClearedRows = document.getElementById('clearedRows');
export const handleFullRows = () => {
    let toBeRemoved = [];
    [...Array(virtualHeight).keys()].forEach(y => {
        const row = inactiveBlocks.filter(i => i.Y === y);
        if (row.length === 10)
            toBeRemoved.push(y);
    });
    if (toBeRemoved.length === 0)
        return;
    clearedRows += toBeRemoved.length;
    totalClearedRows += toBeRemoved.length;
    let filtered = [];
    outer: for (const i of inactiveBlocks) {
        for (const j of toBeRemoved) {
            if (i.Y === j)
                continue outer;
            if (i.Y < j)
                i.Y++;
        }
        filtered.push(i);
    }
    setInactiveBlocks(filtered);
    displayedClearedRows.innerHTML = `cleared rows ${totalClearedRows}`;
    const pointsGained = (level + 1) * [40, 100, 300, 1200][toBeRemoved.length - 1];
    addToScore(pointsGained);
    checkAndUpdateLevel();
};
