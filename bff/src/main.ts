import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { AppModule } from './app.module';

const fs = require('fs');
const path = require('path');

const httpsOptions = {
  cert: fs.readFileSync(
    path.join(__dirname, '../src/certificate/fullchain.pem'),
  ),
  key: fs.readFileSync(path.join(__dirname, '../src/certificate/privkey.pem')),
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
