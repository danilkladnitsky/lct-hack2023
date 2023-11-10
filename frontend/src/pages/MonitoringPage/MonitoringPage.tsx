import { Grid } from "@mantine/core";

import { Sidebar, CameraView } from '@/widgets';

import classNames from "classnames";

import styles from './MonitoringPage.module.scss';
import { PageProps } from '../pages.types';
import { useSocketContext } from "../../context/SocketContext";

export const MonitoringPage = ({ className }: PageProps) => {
  const { selectedCamera } = useSocketContext();

  return (
    <Grid className={classNames(styles.pageContent, className)}>
      <Grid.Col span={3}>
        <Sidebar />
      </Grid.Col>
      <Grid.Col span={9}>
        {selectedCamera && <CameraView name={selectedCamera.name} />}
      </Grid.Col>
    </Grid>
  );
};
