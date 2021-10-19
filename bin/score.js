let score = 0;
const updateScore = () => {
    let htmlScore = document.getElementById("score");
    htmlScore.innerHTML = `Score: ${score}`;
};
export const addToScore = (newPoints) => {
    score += newPoints;
    updateScore();
};
