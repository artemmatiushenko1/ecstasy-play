import GameEditor from './gameEditor.js';
import '../../style.css';

const mount = (root, gameAppEventService, config) => {
  const { showControls } = config ?? {};

  const gameTitle = document.createElement('h1');
  gameTitle.innerText = 'Tetrislet';

  const main = document.createElement('div');
  main.className = 'main';

  const scoreBoard = document.createElement('div');
  scoreBoard.className = 'scoreBoard';

  const score = document.createElement('h2');
  score.innerText = 'Score: ';

  const scoreValue = document.createElement('span');
  scoreValue.className = 'score-value';
  scoreValue.innerText = '0';
  score.append(scoreValue);

  const gameOver = document.createElement('div');
  gameOver.className = 'game-over hidden';

  const gameOverText = document.createElement('h3');
  gameOverText.innerText = 'Game Over';

  const restartButton = document.createElement('button');
  restartButton.className = 'restart-button';
  restartButton.innerText = 'Restart Game';

  gameOver.append(gameOverText);
  gameOver.append(restartButton);

  scoreBoard.append(score);
  scoreBoard.append(gameOver);

  if (showControls) {
    root.prepend(gameTitle);
  }

  root.append(main);

  if (showControls) {
    root.append(scoreBoard);
  }

  const gameEditor = new GameEditor(gameAppEventService);
  gameEditor.init();
  gameAppEventService.fire(gameAppEventService.GameAppEvent.MOUNT);

  return () => {
    gameEditor.destroy();
    root.replaceChildren();
    gameAppEventService.fire(gameAppEventService.GameAppEvent.UNMOUNT);
  };
};

export default mount;
