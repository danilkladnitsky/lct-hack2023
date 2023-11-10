import {  SegmentedControl, Indicator, Group, SegmentedControlItem, Avatar  } from "@mantine/core";

import styles from "./Header.module.scss";
import { WidgetProps } from "../widget.types";
import classNames from "classnames";

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

export const Header = ({ className }: WidgetProps) => {
  return (
    <div className={classNames(styles.header, className)}>
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
