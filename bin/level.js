import { clearedRows, setClearedRows } from "./rows.js";
export let level = 0;
let requiredRows = (level + 1) * 10;
export const checkLevel = () => {
    if (level == 29)
        return;
    if (clearedRows >= requiredRows) {
        setClearedRows(clearedRows - requiredRows);
        requiredRows = (++level + 1) * 10;
    }
};
export const updateLevel = () => {
    let displayedLevel = document.getElementById("level");
    displayedLevel.innerHTML = "Level: ${level}";
};
