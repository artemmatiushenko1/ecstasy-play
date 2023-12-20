import { Snake } from './SnakeClass.js';
import { Game } from './GameClass.js';
import { Board, Target } from './ObjectPartsClasses.js';

const mount = (root, gameAppEventService, config) => {
  const { showControls } = config ?? {};

  const cvs = document.createElement('canvas');
  cvs.id = 'canvas';
  cvs.width = 458;
  cvs.height = 454;

  if (showControls) {
    const controlsContainer = document.createElement('div');
    const scoreElement = document.createElement('h1');

    const scoreValueElement = document.createElement('span');
    scoreValueElement.id = 'score-value';

    const startButtonElement = document.createElement('button');
    startButtonElement.id = 'button-start';
    startButtonElement.style = 'width: 280px; padding: 30px 0; font-size: 30px';
    startButtonElement.innerText = 'Restart Game';

    const scoreTextNode = document.createElement('span');
    scoreTextNode.innerText = 'Score:';
    scoreElement.appendChild(scoreTextNode);
    scoreElement.appendChild(scoreValueElement);

    controlsContainer.appendChild(scoreElement);
    controlsContainer.appendChild(startButtonElement);

    root.appendChild(controlsContainer);
  }
  root.appendChild(cvs);

  const ctx = cvs.getContext('2d');
  const game = new Game();

  game.init(
    Snake.getInstance(),
    Target.getInstance(),
    Board.getInstance(),
    ctx,
    gameAppEventService
  );

  gameAppEventService.fire(gameAppEventService.GameAppEvent.MOUNT);

  return () => {
    game.destroy();
    root.replaceChildren();
    gameAppEventService.fire(gameAppEventService.GameAppEvent.UNMOUNT);
  };
};

export default mount;
