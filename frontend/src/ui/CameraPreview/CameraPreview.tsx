import classNames from 'classnames';
import { useSocketContext } from '../../context/SocketContext';
import styles from './CameraPreview.module.scss';

type Props = {
  title: string;
};

export const CameraPreview = ({ title = 'Камера #1' }: Props) => {
  const { cameraFrames, selectedCamera, cameras, setSelectedCamera } = useSocketContext();

  const frame = cameraFrames.find((c) => c.camera === title);
  const thisCamera = cameras.find((c) => c.name === title);

  const base64 = frame?.frame;

  const frameContent = `data:image/jpg;base64, ${base64}`;

  return (
    <div
      onClick={() => setSelectedCamera(thisCamera)}
      className={classNames(styles.preview, { [styles.selected]: selectedCamera?.name === title })}
    >
      {base64 && <img src={frameContent} alt={title} />}
      <div className={styles.title}>{title}</div>
    </div>
  );
};
