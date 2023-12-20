import Figure from './figure.js';
import * as CONSTANTS from './../config.js';

export default class FigureZ extends Figure {
  color = CONSTANTS.GREEN_CELL_ID;
  #START_X1 = 4;
  #START_Y1 = 0;
  #START_X2 = 5;
  #START_Y2 = 0;
  #START_X3 = 5;
  #START_Y3 = 1;
  #START_X4 = 6;
  #START_Y4 = 1;
  figureArray = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ];

  constructor() {
    super();
    this.setCoordinates(
      this.#START_X1,
      this.#START_Y1,
      this.#START_X2,
      this.#START_Y2,
      this.#START_X3,
      this.#START_Y3,
      this.#START_X4,
      this.#START_Y4
    );
  }
}
