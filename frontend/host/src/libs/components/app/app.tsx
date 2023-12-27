import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../app-layout/app-layout.js';
import { HomePage } from '@/pages/home/home.js';
import { GamePage } from '@/pages/game/game.js';
import { GameGuard } from '@/pages/game/libs/components/components.js';
import { AppRoute } from '@/libs/enums/app-route.enum.js';
import { AuthPage } from '@/pages/auth/auth.js';
import { PrivateRoute } from '../router/private-route.js';
import { PublicRoute } from '../router/public-route.js';
import { useAuthStore } from '@/stores/auth/auth.js';
import { useProfileStore } from '@/stores/profile/profile.js';
import { useQuery } from 'react-query';
import { Spinner } from '@nextui-org/react';
import { authApi } from '@/packages/auth/auth.package.js';

const App = () => {
  const { user, setUser } = useProfileStore(({ setUser, user }) => ({
    setUser,
    user,
  }));

  const accessToken = useAuthStore((state) => state.accessToken);

  const { isLoading } = useQuery(
    ['get-user', accessToken, user],
    () => authApi.getProfile(),
    {
      retry: false,
      enabled: Boolean(accessToken) && !user,
      onSuccess: (data) => setUser(data),
    },
  );

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
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
      </Route>
      <Route element={<PublicRoute />}>
        <Route path={AppRoute.SIGN_IN} element={<AuthPage />} />
        <Route path={AppRoute.SIGN_UP} element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export { App };
