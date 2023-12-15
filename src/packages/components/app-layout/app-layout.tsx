import { Outlet, useLocation } from 'react-router-dom';
import styles from './app-layout.module.scss';
import { Sidebar } from '../sidebar/sidebar.js';
import { AppRoute } from '@/libs/enums/app-route.enum.js';

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className={styles.appLayout}>
      {location.pathname !== AppRoute.GAME && (
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
      )}
      <main className="p-6 overflow-auto flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export { AppLayout };
