// Handles input from the user
import { rotateTetrimino, shiftTetrimino } from "./movement.js";
import { addToScore } from "./score.js";
import { EDirection } from "./tetrimino.js";

/**
 * Creates an event listener for keydown 
 */
export const handleKeypress = (): void => {
	document.addEventListener("keydown", handleMovement);	
}

/**
 * Handles movement for the keypress
 * @param e The keyboard event
 */
export const handleMovement = (e: KeyboardEvent): void => {
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
		case "Space":
			// For hard drop
			break;
	}
}