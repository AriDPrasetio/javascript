function createScoreManager(displayElement, initialScore = 0) {
  let score = initialScore;
  function updateDOM() {
    displayElement.textContent = score;
  }
  return {
    addPoint(points = 1) {
      score += points;
      updateDOM();
    },
    resetScore() {
      score = initialScore;
      updateDOM();
    },
  };
}

const scoreDisplay = document.querySelector("#score-display");
const scoreTracker = createScoreManager(scoreDisplay, 0);

document
  .querySelector("#btn-add")
  .addEventListener("click", () => scoreTracker.addPoint(5));
document
  .querySelector("#btn-reset")
  .addEventListener("click", () => scoreTracker.resetScore());
