import { rotateTetrimino, shiftTetrimino } from "./movement.js";
import { EDirection } from "./tetrimino.js";
export const handleKeypress = () => {
    document.addEventListener("keydown", handleMovement);
};
export const handleMovement = (e) => {
    switch (e.code) {
        case "ArrowDown":
        case "KeyS":
        case "KeyK":
            shiftTetrimino(EDirection.Down);
            break;
        case "ArrowLeft":
        case "KeyA":
        case "KeyJ":
            shiftTetrimino(EDirection.Left);
            break;
        case "ArrowRight":
        case "KeyD":
        case "KeyL":
            shiftTetrimino(EDirection.Right);
            break;
        case "ArrowUp":
        case "KeyI":
        case "KeyW":
            rotateTetrimino();
            break;
    }
};
