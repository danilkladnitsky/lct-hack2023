import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { RtspManager } from '../lib/rtsp.js';

type StreamResource = {
  url: string;
  name: string;
};

@WebSocketGateway({ namespace: 'stream' })
export class StreamGateway {
  @WebSocketServer()
  server: Server;
  ffmpegClient: RtspManager = new RtspManager();
  streamResources: StreamResource[] = [];

  @SubscribeMessage('create-stream')
  createStream(
    @MessageBody() resource: StreamResource,
    @ConnectedSocket() client: Socket,
  ) {
    this.streamResources.push(resource);
    client.emit('debug', this.streamResources);
  }

  @SubscribeMessage('request-frame')
  requestFrame(
    @MessageBody() camera: string,
    @ConnectedSocket() client: Socket,
  ) {
    const cameraResource = this.streamResources.find((c) => c.name === camera);

    if (!cameraResource) {
      return null;
    }

    const callbackFn = this.sendFrame.bind(this, cameraResource.name, client);
    this.ffmpegClient.getFrame(cameraResource.url, callbackFn);
  }

  sendFrame = (
    cameraIdx: string,
    client: Socket,
    frameIsReady: boolean,
    frame: string,
  ) => {
    if (frameIsReady) {
      const channel = `camera/${cameraIdx}`;
      client.emit(channel, frame);
    }
  };
}
