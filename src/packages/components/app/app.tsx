import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../app-layout/app-layout.js';
import { HomePage } from '@/pages/home/home.js';
import { GamePage } from '@/pages/game/game.js';

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/insights" element={<div>Insights</div>} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};

export { App };
