import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
const schedule = require('node-schedule');

import { RtspManager } from '../lib/rtsp.js';

type StreamResource = {
  url: string;
  name: string;
};

type CameraFrame = {
  camera: string;
  frame: string;
};

@WebSocketGateway({
  namespace: 'stream',
  transports: ['websocket'],
  cors: true,
})
export class StreamGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  ffmpegClient: RtspManager = new RtspManager();
  streamResources: StreamResource[] = [];
  frameCount = 0;

  handleConnection(@ConnectedSocket() client: Socket) {
    client.emit('added-stream', this.streamResources);
  }

  @SubscribeMessage('reset-streams')
  resetAllStreams() {
    this.streamResources = [];
    schedule.gracefulShutdown();
  }

  @SubscribeMessage('create-stream')
  createStream(@MessageBody() resource: StreamResource) {
    this.streamResources.push(resource);
    this.server.emit('added-stream', this.streamResources);

    schedule.scheduleJob(
      '*/2 * * * * *',
      this.requestFrame.bind(this, resource.name),
    );
  }

  async requestFrame(camera: string) {
    const cameraResource = this.streamResources.find((c) => c.name === camera);

    if (!cameraResource) {
      return null;
    }

    const { isOk, message } = await this.ffmpegClient.getFrame(
      cameraResource.url,
      cameraResource.name,
    );

    if (isOk) {
      const newFrame = { camera, frame: message };
      this.server.emit('cameras', newFrame);

      if (this.frameCount === 10) {
        this.detectTrade(message || '', cameraResource.name)
        this.frameCount = 0;
      } else {
        this.frameCount++;
      }
    }
  }

  async detectTrade(frame: string, camera: string) {
    try {
      const response = await fetch(
        'https://lct.1431207-ck39036.tw1.ru/ml/process_base64',
        {
          method: 'POST',
          body: JSON.stringify({ base64_string: frame }),
          headers: {
            'content-type': 'application/json',
          },
        },
      ).then((res) => res.json());

      console.log(response)

      const hasBoxes = Boolean(response.boxes);

      if (hasBoxes) {
        this.server.emit('detect', { ...response, camera });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
