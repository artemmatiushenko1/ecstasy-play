import { ErrorBoundary } from '@/packages/components/components.js';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Spinner,
  Tooltip,
} from '@nextui-org/react';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MdOutlineArrowBackIosNew,
  MdAccessTime,
  MdSportsScore,
  MdEmojiEvents,
} from 'react-icons/md';
import { AppRoute } from '@/libs/enums/enums.js';
import { ValueOf } from '@/libs/types/types.js';
import { GameAppEvent } from './libs/enums/enums.js';

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

  const handleQuitGame = () => navigate(AppRoute.HOME);

  const appsMap = {
    'snake': SnakeApp,
    'connectTiles': ConnectTilesApp,
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
      <Modal
        backdrop="blur"
        hideCloseButton
        placement="center"
        isOpen={hasGameEnded}
      >
        <ModalContent className="py-9">
          <ModalBody className="text-center">
            <div className="flex flex-col items-center">
              <h2 className="mb-5 text-default">
                Congratulations! You've scored:
              </h2>
              <h3 className="text-6xl font-bold text-center ">{score}</h3>
              <MdEmojiEvents className="text-amber-400 text-8xl text-center mb-5" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              fullWidth
              color="danger"
              variant="light"
              onPress={handleQuitGame}
            >
              Quit
            </Button>
            <Button fullWidth color="primary">
              Play Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { GamePage };
