import { Outlet } from 'react-router-dom';
import styles from './app-layout.module.scss';
import { Navbar } from '../navbar/navbar.js';

const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <nav className={styles.navbar}>
        <Navbar />
      </nav>
      <aside className={styles.sidebar}>Sidebar</aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export { AppLayout };
