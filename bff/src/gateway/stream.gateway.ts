import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { RtspManager } from '../lib/rtsp.js';

type StreamResource = {
  url: string;
  name: string;
};

type CameraFrame = {
  camera: string;
  frame: Buffer;
}

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
  cachedFrames: CameraFrame[] = [];

  handleConnection(@ConnectedSocket() client: Socket) {
    client.emit('added-stream', this.streamResources);
    client.emit('cameras', this.cachedFrames);
  }

  @SubscribeMessage('create-stream')
  createStream(
    @MessageBody() resource: StreamResource,
    @ConnectedSocket() client: Socket,
  ) {
    this.streamResources.push(resource);
    this.server.emit('added-stream', this.streamResources);
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
    camera: string,
    client: Socket,
    frameIsReady: boolean,
    frame: Buffer,
  ) => {
    if (frameIsReady) {
      const newFrame = { camera, frame };
      client.emit('cameras', newFrame);
      this.cachedFrames.push(newFrame);
    }
  };
}
