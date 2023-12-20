export default class Score {
  #score = 0;
  scoreBoard = document.querySelector('.score-value');

  getScore() {
    return this.#score;
  }

  addPoints(points) {
    this.#score += points;

    if (this.scoreBoard) {
      this.scoreBoard.textContent = this.#score;
    }
  }

  nullify() {
    this.#score = 0;

    if (this.scoreBoard) {
      this.scoreBoard.textContent = this.#score;
    }
  }

  addOnRawsFilled(quantity) {
    switch (quantity) {
      case 1:
        this.addPoints(100);
        return;
      case 2:
        this.addPoints(300);
        return;
      case 3:
        this.addPoints(700);
        return;
      case 4:
        this.addPoints(1000);
        return;
    }
  }
}
