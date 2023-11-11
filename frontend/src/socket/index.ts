import { io } from 'socket.io-client';

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://lct.1431207-ck39036.tw1.ru:3000/stream'
    : 'http://localhost:3000/stream';

export const socket = io(URL, {
  autoConnect: true,
  transports: ['websocket'],
});
