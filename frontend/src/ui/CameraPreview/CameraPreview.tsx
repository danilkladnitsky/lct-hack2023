import classNames from 'classnames';
import { useSocketContext } from '../../context/SocketContext';
import styles from './CameraPreview.module.scss';

type Props = {
  title: string;
};

export const CameraPreview = ({ title = 'Камера #1' }: Props) => {
  const { cameraFrames, selectedCamera } = useSocketContext();

  const frame = cameraFrames.find((c) => c.camera === title);

  const frameContent = `data:image/jpg;base64, ${frame?.frame}`;

  return (
    <div className={classNames(styles.preview, { [styles.selected]: selectedCamera?.name === title })}>
      <img src={frameContent} alt={title} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};
