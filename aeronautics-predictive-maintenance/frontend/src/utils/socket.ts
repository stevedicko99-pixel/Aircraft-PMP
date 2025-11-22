import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000'; // Replace with backend server URL

let socket: Socket;

export const initiateSocketConnection = (): Socket => {
  socket = io(SERVER_URL, {
    transports: ['websocket'],
  });
  console.log('Connecting socket...');
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
  }
};

export const getSocket = (): Socket | undefined => {
  return socket;
};
