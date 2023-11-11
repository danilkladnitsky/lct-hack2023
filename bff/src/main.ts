import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { AppModule } from './app.module';

import fullChain from './certificate/fullchain.pem';
import privkey from './certificate/privkey.pem';

const httpsOptions = {
  cert: fullChain,
  key: privkey,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    httpsOptions,
  });
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
