import { Outlet } from 'react-router-dom';
import styles from './app-layout.module.scss';
import { Sidebar } from '../sidebar/sidebar.js';
import classNames from 'classnames';

const AppLayout = () => {
  return (
    <div className={classNames(styles.appLayout, 'font-jost')}>
      <aside>
        <Sidebar />
      </aside>
      <main className="p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export { AppLayout };
