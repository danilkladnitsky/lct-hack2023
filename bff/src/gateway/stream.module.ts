import { Module } from '@nestjs/common';
import { StreamGateway } from './stream.gateway';

@Module({
  imports: [StreamGateway],
})
export class SocketModule {}