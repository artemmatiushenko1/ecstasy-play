import { ErrorBoundary } from '@/libs/components/components.js';
import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdSportsScore, MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AppRoute } from '@/libs/enums/enums.js';
import { GameMetaChip, GameResultModal } from './libs/components/components.js';
import {
  GameApp,
  GameAppEventService,
  GameAppEvent,
  gamesStatsApi,
} from '@/packages/games/games.package.js';
import { formatGameTime } from './libs/helpers/helpers.js';
import { useMounted, useTimer } from '@/libs/hooks/hooks.js';
import { useMutation } from 'react-query';

import styles from './game.module.css';

const ConnectTilesApp = lazy(
  () => import('@/packages/games/apps/connect-tiles/connect-tiles.js'),
);

const SnakeApp = lazy(() => import('@/packages/games/apps/snake/snake.js'));

const TetrisApp = lazy(() => import('@/packages/games/apps/tetris/tetris.js'));

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

const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [hasGameEnded, setHasGameEnded] = useState(false);

  const mounted = useMounted();

  const { mutate: postStatsMutate } = useMutation(() =>
    gamesStatsApi.post({ score, time, game: { id: appId } }),
  );

  const {
    time,
    stop: stopTimer,
    start: startTimer,
    reset: resetTimer,
  } = useTimer();

  const { appName, appId } = location.state;

  useEffect(() => {
    const handleScoreUpdate = (e: CustomEventInit) => {
      setScore(e.detail.score);
    };

    const handleGameEnd = () => {
      setHasGameEnded(true);
      stopTimer();

      postStatsMutate();
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
  }, [stopTimer, resetTimer, startTimer, postStatsMutate]);

  const handleQuitGame = () => {
    navigate(AppRoute.HOME);
  };

  const handlePlayAgain = () => {
    GameAppEventService.fire(GameAppEvent.RESTART);

    resetTimer();
    startTimer();
    setHasGameEnded(false);
  };

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
          <div className={styles.gameMetaItemsWrapper}>
            <GameMetaChip
              value={score}
              tooltip="Score"
              icon={<MdSportsScore />}
            />
            <GameMetaChip
              tooltip="Playing Time"
              icon={<MdSportsScore />}
              value={formatGameTime(time)}
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ErrorBoundary>
            <Suspense fallback={<Spinner size="lg" />}>
              {mounted && <GameAppComponent />}
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
