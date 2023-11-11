import React from 'react';
import { TextInput, Button, Flex } from '@mantine/core';

import styles from './AddCamerasForm.module.scss';
import { useSocketContext } from '../../context/SocketContext';
import { Camera } from '../../entities';
import { socket } from '../../socket';

export const AddCamerasForm = () => {
  const { setCameras: submitCameras, setSelectedCamera } = useSocketContext();
  const [cameras, setCameras] = React.useState<Camera[]>([]);

  const handleCameraAdd = (name: string, value: string) => {
    setCameras((v) => {
      if (v.length == 0) {
        return [{ name, url: value }];
      }

      if (v.find((c) => c.name === name)) {
        return v.map((c) => (c.name === name ? { name, url: value } : c));
      }

      return [...cameras, { name, url: value }];
    });
  };

  const submit = () => {
    const newCameras = cameras.filter((c) => c.url.trim());

    if (newCameras.length) {
      submitCameras(newCameras);
      setSelectedCamera(newCameras[0]);
    }

    newCameras.forEach((c) => {
      socket.emit('create-stream', c);
    });
  };

  return (
    <div className={styles.form}>
      <Flex gap={16} direction="column" className={styles.wrapper}>
        <h2>Введите адреса камер</h2>
        <TextInput
          description="Камера №1"
          placeholder="Введите адрес камеры"
          onChange={(v) => handleCameraAdd('Camera_1', v.target.value)}
        />
        <TextInput
          description="Камера №2"
          placeholder="Введите адрес камеры"
          onChange={(v) => handleCameraAdd('Camera_2', v.target.value)}
        />
        <TextInput
          description="Камера №3"
          placeholder="Введите адрес камеры"
          onChange={(v) => handleCameraAdd('Camera_3', v.target.value)}
        />
        <TextInput
          description="Камера №4"
          placeholder="Введите адрес камеры"
          onChange={(v) => handleCameraAdd('Camera_4', v.target.value)}
        />
        <Button onClick={submit}>Добавить</Button>
      </Flex>
    </div>
  );
};
