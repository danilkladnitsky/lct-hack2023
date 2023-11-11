import { Flex } from '@mantine/core';

import styles from './CameraView.module.scss';
import { useSocketContext } from '../../context/SocketContext';

export const CameraView = () => {
  const { selectedCamera, cameraFrames } = useSocketContext();

  const lastFrame = cameraFrames.find(c => c.camera === selectedCamera?.name);

  const base64 = lastFrame?.frame;

  const frameContent = `data:image/jpg;base64, ${base64}`;

  return (
    <div className={styles.frame}>
      <Flex gap={8} align="center" className={styles.header}>
        <div className={styles.title}>{selectedCamera.name}</div>
      </Flex>
      <div className={styles.stream} id="stream">
        {base64 && <img src={frameContent} alt={selectedCamera?.name} />}
      </div>
    </div>
  );
};
