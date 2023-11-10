import classNames from "classnames";

import styles from "./DetectedFrames.module.scss";

type DetectedFramesProps = {
    className?: string;
}

type DetectedFrameProps = {
  src: string;
}

const Frame = ({ src }: DetectedFrameProps) => {
  return <div src={src} className={styles.frame} />
}

export const DetectedFrames = ({ className }: DetectedFramesProps) => {
  return (
    <div className={classNames(styles.frames, className)}>
      <div className={styles.list}>
      {Array.from({length: 12}).map((_, idx) => <Frame key={idx} />)}
      </div>
    </div>
  )
}
