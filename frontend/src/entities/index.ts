export type Camera = { name: string; url: string };

export type CameraFrame = {
  camera: string;
  frame: Buffer;
};

export type DetectInfo = {
  boxes: [[number, number], [number, number]];
  names: string[];
  camera: string;
};
