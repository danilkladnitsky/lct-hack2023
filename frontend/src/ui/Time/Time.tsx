import styles from './Time.module.scss';

type Props = {
  date: string;
};

export const Time = ({ date = new Date().toLocaleDateString('ru-RU') }: Props) => {
  return <div className={styles.time}>{date}</div>;
};
