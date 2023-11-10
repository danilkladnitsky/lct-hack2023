import { useEffect } from "react";
import { Badge, Flex } from "@mantine/core";
import JSMpeg from "@cycjimmy/jsmpeg-player";

import styles from "./CameraView.module.scss";
import { DetectedFrames } from "../DetectedFrames/";

export const CameraView = () => {

  return (
          <div className={styles.frame}>
              <Flex gap={8} align="center" className={styles.header}>
                  <div className={styles.title}>
                      Camera #1
                  </div>
                  <Badge className={styles.status}>online</Badge>
              </Flex>
      <div className={styles.stream} id="stream">
      <video id="test_video" controls autoPlay>
    <source src="localhost:9999" />
</video>
              </div>
            <DetectedFrames className={styles.timeline} />
          </div>
  )
}
