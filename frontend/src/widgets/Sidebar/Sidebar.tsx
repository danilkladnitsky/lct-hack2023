import { Stack } from "@mantine/core";
import { CameraPreview } from "@/ui/CameraPreview";

import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  return <div className={styles.sidebar}>
    <Stack gap={8}>{Array.from({length: 10}).map((_, idx) => <CameraPreview key={idx} />)}</Stack>
  </div>;
};