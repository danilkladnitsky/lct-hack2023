import { Flex } from '@mantine/core';

import styles from './CameraView.module.scss';
import { DetectedFrames } from '../DetectedFrames/';
import { useSocketContext } from '../../context/SocketContext';

export const CameraView = () => {
  const { selectedCamera, cameraFrames } = useSocketContext();

  const lastFrame = cameraFrames.find(c => c.camera === selectedCamera?.name);

  const raw = btoa(unescape(encodeURIComponent(lastFrame?.frame)));

  const frameContent = `data:image/jpg;base64, ${raw}`;

  return (
    <div className={styles.frame}>
      <Flex gap={8} align="center" className={styles.header}>
        <div className={styles.title}>{selectedCamera.name}</div>
      </Flex>
      <div className={styles.stream} id="stream">
        {lastFrame && <img src={frameContent} alt={selectedCamera?.name} />}
      </div>
      <DetectedFrames className={styles.timeline} />
    </div>
  );
};
