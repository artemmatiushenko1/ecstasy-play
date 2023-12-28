import { ErrorBoundary } from '@/libs/components/components.js';
import { Button, Chip, Spinner, Tooltip } from '@nextui-org/react';
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
import { formatGameTime } from './libs/helpers/helpers.js';
import { useTimer } from '@/libs/hooks/hooks.js';

const ConnectTilesApp = lazy(
  () => import('@/packages/games/apps/connect-tiles/connect-tiles.js'),
);

const SnakeApp = lazy(() => import('@/packages/games/apps/snake/snake.js'));

const TetrisApp = lazy(() => import('@/packages/games/apps/tetris/tetris.js'));

const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [hasGameEnded, setHasGameEnded] = useState(false);

  const {
    time,
    stop: stopTimer,
    start: startTimer,
    reset: resetTimer,
  } = useTimer();

  useEffect(() => {
    const handleScoreUpdate = (e: CustomEventInit) => {
      setScore(e.detail.score);
    };

    const handleGameEnd = () => {
      setHasGameEnded(true);
      stopTimer();
    };

    const handleGameAppMount = () => {
      startTimer();
    };

    const handleGameAppUnmount = () => {
      stopTimer();
      resetTimer();
    };

    const handlers = [
      [GameAppEvent.SCORE_UPDATE, handleScoreUpdate],
      [GameAppEvent.END, handleGameEnd],
      [GameAppEvent.MOUNT, handleGameAppMount],
      [GameAppEvent.UNMOUNT, handleGameAppUnmount],
    ] as const;

    for (const [event, handler] of handlers) {
      GameAppEventService.subscribe(event, handler);
    }

    return () => {
      for (const [event, handler] of handlers) {
        GameAppEventService.unsubscribe(event, handler);
      }
    };
  }, [startTimer, stopTimer, resetTimer]);

  const handleQuitGame = () => {
    navigate(AppRoute.HOME);
  };

  const handlePlayAgain = () => {
    GameAppEventService.fire(GameAppEvent.RESTART);

    resetTimer();
    startTimer();
    setHasGameEnded(false);
  };

  const appsDataMapper = {
    [GameApp.SNAKE]: {
      name: 'Snake',
      Component: SnakeApp,
    },
    [GameApp.CONNECT_TILES]: {
      name: 'Connect Tiles',
      Component: ConnectTilesApp,
    },
    [GameApp.TETRIS]: {
      name: 'Tetris',
      Component: TetrisApp,
    },
  };

  const appName = location.state.appName;

  const { Component: GameAppComponent } =
    appsDataMapper[location.state.appName as keyof typeof appsDataMapper];

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="w-full flex justify-between items-center">
          <div className="flex-1 self-center">
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
                variant="solid"
                onPress={handleQuitGame}
                startContent={<MdOutlineArrowBackIosNew />}
              >
                Quit Game
              </Button>
            </Tooltip>
          </div>
          <h1 className="py-2 px-4 rounded-lg text-lg font-medium flex-1 text-center">
            {appName}
          </h1>
          <div className="flex items-center justify-end gap-5 flex-1">
            <Tooltip content="Score" placement="bottom">
              <div className="min-w-[100px] flex justify-end">
                <Chip
                  color="primary"
                  className="text-xl"
                  classNames={{
                    base: 'h-auto bg-primary-50',
                    content: 'flex items-center gap-2 text-primary font-medium',
                  }}
                >
                  <MdSportsScore />
                  <span>{score}</span>
                </Chip>
              </div>
            </Tooltip>
            <Tooltip content="Playing Time" placement="bottom">
              <div className="min-w-[110px]">
                <Chip
                  color="primary"
                  className="text-xl"
                  classNames={{
                    base: 'h-auto bg-primary-50',
                    content: 'flex items-center gap-2 text-primary font-medium',
                  }}
                >
                  <MdAccessTime />
                  <span>{formatGameTime(time)}</span>
                </Chip>
              </div>
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
