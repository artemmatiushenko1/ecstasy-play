import { AppRoute } from '@/libs/enums/enums.js';
import { useProfileStore } from '@/stores/profile/profile.js';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {
  const user = useProfileStore((state) => state.user);
  const isAuthenticated = Boolean(user);

  const location = useLocation();
  const from = location.state?.from?.pathname || AppRoute.HOME;

  return isAuthenticated ? <Navigate to={from} replace /> : <Outlet />;
};

export { PublicRoute };
