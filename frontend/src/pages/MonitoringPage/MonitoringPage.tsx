import { Grid } from "@mantine/core";

import { Sidebar, CameraView } from '@/widgets';

import classNames from "classnames";

import styles from './MonitoringPage.module.scss';
import { PageProps } from '../pages.types';

export const MonitoringPage = ({ className }: PageProps) => {
  return (
    <Grid className={classNames(styles.pageContent, className)}>
      <Grid.Col span={3}>
        <Sidebar />
      </Grid.Col>
      <Grid.Col span={9}>
        <CameraView />
      </Grid.Col>
    </Grid>
  );
};
