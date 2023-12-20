import { checkIncludes, checkHeadPosition } from './functions.js';
import {
  PLAY_SPEED,
  CONTROLS,
  NUM_START_PARTS,
  BOARD_SIZE,
} from './constants.js';

class Game {
  scoreElement = document.querySelector('#score-value');
  buttonStart = document.querySelector('#button-start');

  key = '';
  ctx;
  _snake;
  _target;
  _board;
  _isGameActive;

  _timers = [];

  init(snake, target, board, ctx, gameAppEventService) {
    this._snake = snake;
    this._target = target;
    this._board = board;
    this.ctx = ctx;
    this.gameAppEventService = gameAppEventService;

    this.startNewGame();

    document.addEventListener('keydown', this.handleKeyDown);

    gameAppEventService?.subscribe(
      gameAppEventService.GameAppEvent.RESTART,
      this.handleButtonPress
    );

    if (this.buttonStart) {
      this.buttonStart.addEventListener('click', this.handleButtonPress);
    }
  }

  destroy = () => {
    document.removeEventListener('keydown', this.handleKeyDown);

    this.gameAppEventService?.unsubscribe(
      this.gameAppEventService.GameAppEvent.RESTART,
      this.handleButtonPress
    );

    for (const timerId of this._timers) {
      clearTimeout(timerId);
    }
  };

  drawing() {
    if (this.key !== '') {
      this._snake.move(this.key);

      if (checkIncludes(this._target, this._snake.getPartsCoordinates())) {
        this._target.newTarget(this._snake);
        this._snake.eatTarget();
      }
    }

    this.ctx.clearRect(0, 0, 900, 900);
    this._board.show(this.ctx);
    this._target.show(this.ctx);
    this._snake.show(this.ctx);
    this.ctx.clearRect(458, 0, 900, 900);
    this.ctx.clearRect(0, 455, 900, 900);
    this.getScore();

    if (
      !checkHeadPosition(this._snake.getPartsCoordinates()) &&
      this._isGameActive
    ) {
      this._timers.push(setTimeout(this.drawing.bind(this), PLAY_SPEED));
    } else {
      this.gameAppEventService?.fire(this.gameAppEventService.GameAppEvent.END);
    }
  }

  startNewGame() {
    this._isGameActive = true;
    this.key = '';
    this._snake.init();
    this._target.newTarget(this._snake);
    this._timers.push(setTimeout(this.drawing.bind(this), 0));
  }

  endGame() {
    this._isGameActive = false;
  }

  handleKeyDown = () => {
    if (CONTROLS.includes(event.code)) {
      this.key = event.code;
    }
  };

  getScore() {
    const newScore = this._snake.getSize() - NUM_START_PARTS;

    if (this.scoreElement) {
      this.scoreElement.textContent = newScore;
    }

    this.gameAppEventService?.fire(
      this.gameAppEventService.GameAppEvent.SCORE_UPDATE,
      { detail: { score: newScore } }
    );

    if (newScore === BOARD_SIZE ** 2 - NUM_START_PARTS) {
      alert('You won this game!');
      this.endGame();
      this.gameAppEventService?.fire(this.gameAppEventService.GameAppEvent.END);
    }
  }

  handleButtonPress = () => {
    this.endGame();
    this._timers.push(
      setTimeout(() => {
        this.startNewGame();
      }, PLAY_SPEED)
    );
  };
}

export { Game };
