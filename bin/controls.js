var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { rotateTetrimino, shiftTetrimino } from "./movement.js";
import { EDirection } from "./tetrimino.js";
export const handleKeypress = () => {
    const delay = 50;
    document.addEventListener("keydown", (e) => {
        const anyStillDown = (...keys) => {
            keys.forEach((k) => {
                if (e.code === k)
                    return true;
            });
            return false;
        };
        switch (e.code) {
            case "ArrowDown":
            case "KeyS":
            case "KeyK":
                doWhileWithSleep(() => shiftTetrimino(EDirection.Down), anyStillDown("ArrowDown", "KeyS", "KeyK"), delay);
                break;
            case "ArrowLeft":
            case "KeyA":
            case "KeyJ":
                doWhileWithSleep(() => shiftTetrimino(EDirection.Left), anyStillDown("ArrowLeft", "KeyA", "KeyJ"), delay);
                break;
            case "ArrowRight":
            case "KeyD":
            case "KeyL":
                doWhileWithSleep(() => shiftTetrimino(EDirection.Right), anyStillDown("ArrowRight", "KeyD", "KeyL"), delay);
                break;
            case "ArrowUp":
            case "KeyI":
            case "KeyW":
                doWhileWithSleep(rotateTetrimino, anyStillDown("ArrowUp", "KeyI", "KeyW"), delay);
                break;
        }
    });
};
export const sleep = (ms) => __awaiter(void 0, void 0, void 0, function* () { return new Promise((res) => setTimeout(res, ms)); });
export const doWhileWithSleep = (fn, condition, ms) => __awaiter(void 0, void 0, void 0, function* () {
    fn();
    yield sleep(ms);
    if (condition)
        doWhileWithSleep(fn, condition, ms);
});
