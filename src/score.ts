/**
 * The user's current score
 */ 
let score = 0;

/**
 * Updates the score that is displayed on the screen
 */
const updateScore = (): void => {
	let htmlScore = document.getElementById("score") as HTMLHeadingElement;
	htmlScore.innerHTML = `Score: ${score}`;
};

/**
 * Increases the user's score on screen
 * @param newPoints The number of points that the user has just scored
 */
export const addToScore = (newPoints: number): void => {
	score += newPoints;
	updateScore();
};