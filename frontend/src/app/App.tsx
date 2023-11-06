import { MantineProvider, createTheme } from '@mantine/core';
import { Header, Sidebar } from '@/widgets/Header';

import '@mantine/core/styles.css';
import styles from './App.module.scss';

const theme = createTheme({});

export function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <div className={styles.layout}>
        <Header />
        <main>
        <Sidebar />
        </main>
      </div>
    </MantineProvider>
  );
}
