import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../app-layout/app-layout.js';

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/home" element={<div>Home</div>} />
        <Route path="/insights" element={<div>Insights</div>} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};

export { App };
