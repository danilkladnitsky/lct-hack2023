import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { RtspManager } from '../lib/rtsp.js';

const RTSP_URL =
  "'rtsp://admin:A1234567@188.170.176.190:8029/Streaming/Channels/101?transportmode=unicast&profile=Profile_1'";

@WebSocketGateway({ namespace: 'stream' })
export class StreamGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  stream: RtspManager;

  afterInit() {
    this.stream = new RtspManager();
    console.log('afterInit');
  }

  handleConnection() {
    this.stream.createStream(RTSP_URL);
  }
}
