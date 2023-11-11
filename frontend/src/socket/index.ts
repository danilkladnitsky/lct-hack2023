import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/stream';

export const socket = io(URL, {
  autoConnect: true,
  transports: ['websocket'],
});
