import { ErrorBoundary } from '@/libs/components/components.js';
import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MdAccessTime,
  MdSportsScore,
  MdOutlineArrowBackIosNew,
} from 'react-icons/md';
import { AppRoute } from '@/libs/enums/enums.js';
import { GameResultModal } from './libs/components/components.js';
import {
  GameApp,
  GameAppEventService,
  GameAppEvent,
} from '@/packages/games/games.package.js';

const ConnectTilesApp = lazy(
  () => import('@/packages/games/apps/connect-tiles/connect-tiles.js'),
);

const SnakeApp = lazy(() => import('@/packages/games/apps/snake/snake.js'));

const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [hasGameEnded, setHasGameEnded] = useState(false);

  useEffect(() => {
    const handleScoreUpdate = (e: CustomEventInit) => {
      setScore(e.detail.score);
    };

    const handleGameEnd = () => {
      setHasGameEnded(true);
    };

    const handlers = [
      [GameAppEvent.SCORE_UPDATE, handleScoreUpdate],
      [GameAppEvent.END, handleGameEnd],
    ] as const;

    for (const [event, handler] of handlers) {
      GameAppEventService.subscribe(event, handler);
    }

    return () => {
      for (const [event, handler] of handlers) {
        GameAppEventService.unsubscribe(event, handler);
      }
    };
  }, []);

  const handleQuitGame = () => {
    navigate(AppRoute.HOME);
  };

  const handlePlayAgain = () => {
    GameAppEventService.fire(GameAppEvent.RESTART);
    setHasGameEnded(false);
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
