import { ErrorBoundary } from '@/libs/components/components.js';
import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MdOutlineArrowBackIosNew,
  MdAccessTime,
  MdSportsScore,
} from 'react-icons/md';
import { AppRoute } from '@/libs/enums/enums.js';
import { ValueOf } from '@/libs/types/types.js';
import { GameAppEvent } from './libs/enums/enums.js';
import { GameResultModal } from './libs/components/game-result-modal.js';
import { GameApp } from '@/packages/games/games.package.js';

const ConnectTilesApp = lazy(
  () => import('@/packages/games/apps/connect-tiles/connect-tiles.js'),
);

const SnakeApp = lazy(() => import('@/packages/games/apps/snake/snake.js'));

const GameEventService = {
  fire: (event: ValueOf<typeof GameAppEvent>, body?: CustomEventInit): void => {
    const customEvent = new CustomEvent(event, body);

    window.dispatchEvent(customEvent);
  },
  subscribe: (event: ValueOf<typeof GameAppEvent>, listener: EventListener) => {
    window.addEventListener(event, listener);
  },
  unsubscribe: (
    event: ValueOf<typeof GameAppEvent>,
    listener: EventListener,
  ) => {
    window.removeEventListener(event, listener);
  },
};

const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [hasGameEnded, setHasGameEnded] = useState(false);

  useEffect(() => {
    const handleScoreChange = (e: CustomEventInit) => {
      setScore(e.detail.score);
    };

    const handleGameEnd = () => {
      setHasGameEnded(true);
    };

    GameEventService.subscribe(GameAppEvent.SCORE_UPDATE, handleScoreChange);
    GameEventService.subscribe(GameAppEvent.END, handleGameEnd);

    return () => {
      GameEventService.unsubscribe(
        GameAppEvent.SCORE_UPDATE,
        handleScoreChange,
      );
      GameEventService.unsubscribe(GameAppEvent.END, handleGameEnd);
    };
  }, []);

  const handleQuitGame = () => {
    navigate(AppRoute.HOME);
  };

  const handlePlayAgain = () => {
    const restartGameEvent = new CustomEvent(GameAppEvent.RESTART);
    setHasGameEnded(false);
    window.dispatchEvent(restartGameEvent);
  };

  const appsMap = {
    [GameApp.SNAKE]: SnakeApp,
    [GameApp.CONNECT_TILES]: ConnectTilesApp,
  };

  const GameAppComponent =
    appsMap[location.state.appId as keyof typeof appsMap];

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="w-full flex justify-between">
          <Tooltip
            placement="bottom"
            content={
              <div className="text-center">
                Please note that your progress will not be saved
                <br /> once you quit the game.
              </div>
            }
          >
            <Button
              color="danger"
              variant="ghost"
              onPress={handleQuitGame}
              startContent={<MdOutlineArrowBackIosNew />}
            >
              Quit Game
            </Button>
          </Tooltip>
          <div className="flex items-center gap-5">
            <Tooltip content="Score" placement="bottom">
              <p className="font-bold text-xl inline-flex items-center gap-2 text-default-400">
                <MdSportsScore />
                <span>{score}</span>
              </p>
            </Tooltip>
            <Tooltip content="Playing Time" placement="bottom">
              <p className="font-bold text-xl inline-flex items-center gap-2 text-default-400">
                <MdAccessTime />
                <span>00:00</span>
              </p>
            </Tooltip>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ErrorBoundary>
            <Suspense fallback={<Spinner size="lg" />}>
              <GameAppComponent />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <GameResultModal
        score={score}
        isOpen={hasGameEnded}
        onQuitClick={handleQuitGame}
        onPlayAgainClick={handlePlayAgain}
      />
    </>
  );
};

export { GamePage };
