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
  frame: Buffer;
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

  handleConnection(@ConnectedSocket() client: Socket) {
    client.emit('added-stream', this.streamResources);
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
    }
  }
}
