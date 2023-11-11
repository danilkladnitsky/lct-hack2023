import React, { useContext, useState, useEffect, PropsWithChildren } from 'react';
import { useSnackbar } from 'notistack';

import { socket } from '../socket';
import { Camera, CameraFrame, DetectInfo } from '../entities';

interface State {
  cameras: Camera[];
  cameraFrames: CameraFrame[];
  connectedToServer: boolean;
  selectedCamera: Camera | null;
}

interface Actions {
  requestFrame: (cameraName: string) => void;
  setCameras: (cameras: Camera[]) => void;
  setSelectedCamera: (camera: Camera) => void;
  resetFrames: () => void;
}

const DEFAULT_STATE: State = {
  cameras: [],
  cameraFrames: [],
  connectedToServer: false,
  selectedCamera: null,
};

const SocketContext = React.createContext<State>(DEFAULT_STATE);

export const useSocketContext = (): State & Actions => useContext(SocketContext);

export const SocketContextProvider = ({ children }: PropsWithChildren) => {
  const [connectedToServer, setConnectedToServer] = useState(socket.connected);
  const { enqueueSnackbar } = useSnackbar();

  const [cameras, setCameras] = useState<Camera[]>([]);
  const [cameraFrames, setCameraFrames] = useState<CameraFrame[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera>(null);

  const resetFrames = () => {
    setCameraFrames([]);
  };

  useEffect(() => {
    function onDetect(info: DetectInfo) {
      console.log(info);
      if (info.boxes.length) {
        enqueueSnackbar(`Замечена нелегальная торговля: ${info.names} на камере: ${info.camera}`);
      }
    }
    function onConnect() {
      setConnectedToServer(true);
      enqueueSnackbar('Подключены к серверу стриминга видео');
    }

    function onDisconnect() {
      setConnectedToServer(false);
      enqueueSnackbar('Отключены к серверу стриминга видео');
    }

    function onCamerasAdd(newCameras: Camera[]) {
      setCameras(newCameras);

      const firstCamera = newCameras[0];

      if (firstCamera) {
        setSelectedCamera(firstCamera);
      }
    }

    function onCamerasFrame(frame: CameraFrame) {
      setCameraFrames((v) => {
        if (!v.length) {
          return [frame];
        }

        if (v.find((c) => c.camera === frame.camera)) {
          return v.map((c) => (c.camera === frame.camera ? frame : c));
        }

        return [...v, frame];
      });
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('added-stream', onCamerasAdd);
    socket.on('cameras', onCamerasFrame);
    socket.on('detect', onDetect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('added-stream', onCamerasAdd);
      socket.off('cameras', onCamerasFrame);
      socket.off('detect', onDetect);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ cameras, cameraFrames, resetFrames, connectedToServer, selectedCamera, setCameras, setSelectedCamera }}
    >
      {children}
    </SocketContext.Provider>
  );
};
