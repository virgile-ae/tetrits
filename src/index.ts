// Getting canvas element from DOM
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// Virtual dimensions of the output
const virtualWidth = 10;
const virtualHeight = 20;

// Actual dimension of canvas divided by virtual dimensions
const blockLength = 30;

// Converts virtual dimensions to actual dimensions for use on the canvas
const blockToPixel = (dim: number) => {
	return dim * blockLength;
};

// User's score
let score = 0;

// Updates the score on screen
const updateScore = () => {
	let htmlScore = document.getElementById("score") as HTMLHeadingElement;
	htmlScore.innerHTML = `Score: ${score}`;
};

// Tetreminos
// Need to find a suitable way of storing these
const tetreminos = ["I", "J", "L", "S", "Z", "T", "O"];