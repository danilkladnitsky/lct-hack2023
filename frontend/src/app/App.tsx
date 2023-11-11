import { MantineProvider, createTheme } from '@mantine/core';
import { Header } from '../widgets';

import '@mantine/core/styles.css';
import styles from './App.module.scss';
import { MonitoringPage } from '../pages';
import { SocketContextProvider } from '../context/SocketContext';

const theme = createTheme({});

export function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <SocketContextProvider>
        <div className={styles.layout}>
          <Header className={styles.appHeader} />
          <MonitoringPage className={styles.currentPage} />
        </div>
      </SocketContextProvider>
    </MantineProvider>
  );
}
