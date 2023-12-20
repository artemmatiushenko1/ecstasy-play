import * as CONSTANTS from './config.js';

export default class Board {
  state;
  #boardElement = document.querySelector('.main');

  constructor() {
    this.fillBoard();
    this.drawBoard();
    this.showState();
  }

  fillBoard() {
    this.state = [];
    for (let i = 0; i < 20; i++) {
      const nullArr = new Array(10);
      nullArr.fill(0);
      this.state.push(nullArr);
    }
  }

  drawBoard() {
    let mainInnerHTML = '';
    for (const row of this.state) {
      for (const el of row) {
        mainInnerHTML += this.generateCellElement(el);
      }
    }
    this.#boardElement.innerHTML = mainInnerHTML;
  }

  clearFigure(figure) {
    this.displayFigure(figure, CONSTANTS.EMPTY_CELL_ID);
    this.drawBoard();
  }

  displayFigure(figure, color = figure.color) {
    for (const coords of figure.coords) {
      const [x, y] = coords;
      this.state[y][x] = color;
    }
    this.drawBoard();
  }

  generateCellElement(cell) {
    switch (cell) {
      case CONSTANTS.EMPTY_CELL_ID:
        return CONSTANTS.EMPTY_CELL_CODE;
      case CONSTANTS.GREY_CELL_ID:
        return CONSTANTS.GREY_CELL_CODE;
      case CONSTANTS.GREEN_CELL_ID:
        return CONSTANTS.GREEN_CELL_CODE;
      case CONSTANTS.RED_CELL_ID:
        return CONSTANTS.RED_CELL_CODE;
      case CONSTANTS.VIOLET_CELL_ID:
        return CONSTANTS.VIOLET_CELL_CODE;
      case CONSTANTS.BLUE_CELL_ID:
        return CONSTANTS.BLUE_CELL_CODE;
      case CONSTANTS.YELLOW_CELL_ID:
        return CONSTANTS.YELLOW_CELL_CODE;
      case CONSTANTS.PINK_CELL_ID:
        return CONSTANTS.PINK_CELL_CODE;
    }
  }

  showState() {
    let stateMatrix = '';
    for (const subArr of this.state) {
      for (const el of subArr) {
        stateMatrix += el + ' ';
      }
      stateMatrix += '\n';
    }
    return stateMatrix;
  }
}
