import { MantineProvider, createTheme } from '@mantine/core';
import { Header } from '../widgets';

import '@mantine/core/styles.css';
import styles from './App.module.scss';
import { MonitoringPage } from '../pages';
import { SocketContextProvider } from '../context/SocketContext';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({});

export function App() {
  return (
    <SnackbarProvider>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <SocketContextProvider>
          <div className={styles.layout}>
            <Header className={styles.appHeader} />
            <MonitoringPage className={styles.currentPage} />
          </div>
        </SocketContextProvider>
      </MantineProvider>
    </SnackbarProvider>
  );
}
