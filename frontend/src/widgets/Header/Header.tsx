import { SegmentedControl, Indicator, Group, SegmentedControlItem, Avatar, Badge } from '@mantine/core';

import styles from './Header.module.scss';
import { WidgetProps } from '../widget.types';
import classNames from 'classnames';
import { useSocketContext } from '../../context/SocketContext';

const MENU_OPTIONS: SegmentedControlItem[] = [
  {
    label: 'Мониторинг',
    value: 'monitoring',
  },
  {
    label: 'Режим разметки',
    value: 'markups',
  },
];

export const Header = ({ className }: WidgetProps) => {
  const { connectedToServer } = useSocketContext();


  const status = connectedToServer ? 'online' : 'offline';

  return (
    <div className={classNames(styles.header, className)}>
      <Group>
        <div className={styles.logo}>AnapaEye</div>
        <Badge className={styles.status}>{status}</Badge>
        <SegmentedControl data={MENU_OPTIONS} />
      </Group>
      <Indicator withBorder inline size={8}>
        <Avatar radius="sm">AE</Avatar>
      </Indicator>
    </div>
  );
};
