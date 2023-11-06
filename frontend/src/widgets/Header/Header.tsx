import {  SegmentedControl, Indicator, Group, SegmentedControlItem, Avatar  } from "@mantine/core";

import styles from "./Header.module.scss";

const MENU_OPTIONS: SegmentedControlItem[] = [
  {
    label: "Мониторинг",
    value: "monitoring"
  },
  {
    label: "Режим разметки",
    value: "markups"
  }
]

export const Header = () => {
  return (
    <div className={styles.header}>
      <Group>
      <div className={styles.logo}>
        AnapaEye
      </div>
      <SegmentedControl data={MENU_OPTIONS} />
      </Group>
      <Indicator inline processing size={8}>
        <Avatar radius="sm">AE</Avatar>
      </Indicator>
    </div>
  )
}
