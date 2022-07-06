import { newTetrimino } from "./blocks.js";
import { handleMovement } from "./controls.js";
import "./ui.js";

// The initial tetrimino
newTetrimino();

// Listens for keypresses
document.addEventListener("keydown", handleMovement);
