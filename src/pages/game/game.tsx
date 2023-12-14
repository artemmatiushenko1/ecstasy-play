import { Spinner } from '@nextui-org/react';
import { Suspense, lazy } from 'react';

const ConnectTilesApp = lazy(
  () => import('@/packages/games/connect-tiles/connect-tiles'),
);

const GamePage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Suspense fallback={<Spinner size="lg" />}>
        <ConnectTilesApp />
      </Suspense>
    </div>
  );
};

export { GamePage };
