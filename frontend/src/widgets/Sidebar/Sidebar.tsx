import { Stack } from "@mantine/core";
import { CameraPreview } from "@/ui/CameraPreview";

import styles from "./Sidebar.module.scss";
import { useSocketContext } from "../../context/SocketContext";

export const Sidebar = () => {
  const { cameras } = useSocketContext();
  return <div className={styles.sidebar}>
    <Stack gap={8}>{cameras.map((camera, idx) => <CameraPreview title={camera.name} key={idx} />)}</Stack>
  </div>;
};