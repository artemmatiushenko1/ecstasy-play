import { Outlet } from 'react-router-dom';
import styles from './app-layout.module.scss';

const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <nav className={styles.navbar}>Nav</nav>
      <aside className={styles.sidebar}>Sidebar</aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export { AppLayout };
