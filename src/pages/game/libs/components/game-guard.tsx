import { AppRoute } from '@/libs/enums/enums.js';
import { Navigate, useLocation } from 'react-router-dom';

interface IGameGuardProps {
  children: React.ReactNode;
}

const GameGuard = ({ children }: IGameGuardProps) => {
  const location = useLocation();

  const appId = location.state?.appId;

  if (!appId) {
    return <Navigate to={AppRoute.HOME} />;
  }

  return children;
};

export { GameGuard };
