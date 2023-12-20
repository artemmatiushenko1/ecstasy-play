export default class Figure {
  coords = [];
  inactiveColor = 1;

  constructor() {}

  setCoordinates(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.coords.push([x1, y1], [x2, y2], [x3, y3], [x4, y4]);
  }

  moveDown(board) {
    const y = 1;
    if (!this.canMoveDown(board)) return false;
    for (const coord of this.coords) {
      coord[y] += 1;
    }
    return true;
  }

  canMoveDown(board) {
    for (const coords of this.coords) {
      const x = coords[0];
      const y = coords[1];
      if (y + 1 >= board.length || board[y + 1][x] !== 0) return false;
    }
    return true;
  }

  moveRight(board) {
    const x = 0;
    if (!this.canMoveRight(board)) return;
    for (const coord of this.coords) {
      coord[x] += 1;
    }
  }

  canMoveRight(board) {
    for (const coord of this.coords) {
      const x = coord[0];
      const y = coord[1];
      if (x + 1 >= board[x].length || board[y][x + 1] !== 0) return false;
    }
    return true;
  }

  moveLeft(board) {
    if (!this.canMoveLeft(board)) return;
    for (const coord of this.coords) {
      coord[0] -= 1;
    }
  }

  canMoveLeft(board) {
    for (const coords of this.coords) {
      const x = coords[0];
      const y = coords[1];
      if (x - 1 < 0 || board[y][x - 1] !== 0) return false;
    }
    return true;
  }

  makeFigureArray(figureLength) {
    const newArr = [];
    for (let i = 0; i < figureLength; i++) {
      newArr[i] = new Array(figureLength).fill(0);
    }
    return newArr;
  }

  rotateMatrix(figureArr) {
    const temp = this.makeFigureArray(figureArr.length);
    for (let y = 0; y < figureArr.length; y++) {
      for (let x = 0; x < figureArr.length; x++) {
        temp[x][y] = figureArr[figureArr.length - 1 - y][x];
      }
    }

    return temp;
  }

  searchMin() {
    let minX = this.coords[0][0];
    let minY = this.coords[0][1];
    for (const arr of this.coords) {
      if (minX > arr[0]) minX = arr[0];
      if (minY > arr[1]) minY = arr[1];
    }
    return [minX, minY];
  }

  roll(board) {
    if (!this.canRoll(board)) return;
    this.figureArray = this.rotateMatrix(this.figureArray);
    let el = 0;
    const [minX, minY] = this.searchMin();
    for (let y = 0; y < this.figureArray.length; y++) {
      for (let x = 0; x < this.figureArray.length; x++) {
        if (this.figureArray[y][x] === 1) {
          this.coords[el][0] = x + minX;
          this.coords[el][1] = y + minY;
          el++;
        }
      }
    }
  }

  canRoll(board) {
    const tmp = this.rotateMatrix(this.figureArray);
    const [minX, minY] = this.searchMin();
    for (let y = 0; y < tmp.length; y++) {
      for (let x = 0; x < tmp.length; x++) {
        const newY = y + minY;
        const newX = x + minX;
        if (
          newY > board.length - 1 ||
          newX > board[newY].length - 1 ||
          board[newY][newX] !== 0
        )
          return false;
      }
    }
    return true;
  }
}
