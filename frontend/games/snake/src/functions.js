import { BOARD_SIZE } from './constants.js';

function checkHeadPosition(coordinates) {
  const xHead = coordinates[coordinates.length - 1][0];
  const yHead = coordinates[coordinates.length - 1][1];
  coordinates.pop();

  let count = 0;
  for (const part of coordinates) {
    if (xHead === part[0] && yHead === part[1]) {
      count++;
    }
  }

  if (
    xHead < 0 ||
    xHead > BOARD_SIZE ||
    yHead < 0 ||
    yHead > BOARD_SIZE ||
    count !== 0
  ) {
    return true;
  } else {
    return false;
  }
}

function checkIncludes(target, coordinates) {
  const xTarget = target.getX();
  const yTarget = target.getY();

  for (const part of coordinates) {
    if (xTarget === part[0] && yTarget === part[1]) {
      return true;
    }
  }

  return false;
}

export { checkHeadPosition, checkIncludes };
