import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../app-layout/app-layout.js';
import { HomePage } from '@/pages/home/home.js';
import { GamePage } from '@/pages/game/game.js';
import { GameGuard } from '@/pages/game/libs/components/components.js';
import { AppRoute } from '@/libs/enums/app-route.enum.js';
import { AuthPage } from '@/pages/auth/auth.js';

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={AppRoute.HOME} element={<HomePage />} />
        <Route
          path={AppRoute.GAME}
          element={
            <GameGuard>
              <GamePage />
            </GameGuard>
          }
        />
        <Route path={AppRoute.INSIGHTS} element={<div>Insights</div>} />
      </Route>
      <Route path={AppRoute.SIGN_IN} element={<AuthPage />} />
      <Route path={AppRoute.SIGN_UP} element={<AuthPage />} />
    </Routes>
  );
};

export { App };
