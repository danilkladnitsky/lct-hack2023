import styles from "./CameraPreview.module.scss";

type Props = {
  title: string;
}

export const CameraPreview = ({ title = "Камера #1" }: Props) => {
  return (
    <div className={styles.preview}>
      <div className={styles.title}>{title}</div>
    </div>
  )
}
