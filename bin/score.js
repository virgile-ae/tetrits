import { gameLoop } from './game.js';
import { loop, setLoop } from './index.js';
import { clearedRows, setClearedRows } from './rows.js';
let score = 0;
export let level = 0;
const displayedScore = document.getElementById('score');
const displayedLevel = document.getElementById('level');
export const addToScore = (newPoints) => {
    score += newPoints;
    displayedScore.innerHTML = `score ${score}`;
};
export const checkAndUpdateLevel = () => {
    const requiredRows = 10;
    if (level === 19)
        return;
    if (clearedRows >= requiredRows) {
        setClearedRows(clearedRows - requiredRows);
        displayedLevel.innerHTML = `level ${++level}`;
        interval *= 0.8;
        clearInterval(loop);
        setLoop(setInterval(gameLoop, interval));
    }
};
export let interval = 800;
