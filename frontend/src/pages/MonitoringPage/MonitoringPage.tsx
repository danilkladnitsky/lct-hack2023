import { Sidebar, CameraView } from '@/widgets';

import classNames from "classnames";

import styles from './MonitoringPage.module.scss';
import { PageProps } from '../pages.types';

export const MonitoringPage = ({ className }: PageProps) => {
  return (
    <main className={classNames(styles.pageContent, className)}>
      <Sidebar />
      <CameraView />
    </main>
  );
};
