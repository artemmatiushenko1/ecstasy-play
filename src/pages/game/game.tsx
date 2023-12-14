import { Spinner } from '@nextui-org/react';
import { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';

const ConnectTilesApp = lazy(
  () => import('@/packages/games/connect-tiles/connect-tiles'),
);

const SnakeApp = lazy(() => import('@/packages/games/snake/snake'));

const GamePage = () => {
  const { state } = useLocation();

  const { appId } = state;

  const appsMap = {
    'snake': SnakeApp,
    'connectTiles': ConnectTilesApp,
  };

  const AppComponent = appsMap[appId as keyof typeof appsMap];

  return (
    <div className="flex items-center justify-center h-full">
      <Suspense fallback={<Spinner size="lg" />}>
        <AppComponent />
      </Suspense>
    </div>
  );
};

export { GamePage };
