import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms: { [key: string]: string[] } = {};

io.on('connection', (socket: Socket) => {
  console.log('Conneted');

  socket.on('join room', (roomID: string) => {
    console.log('Join room fired', roomID);
    if (rooms[roomID]) {
      console.log('Push');
      rooms[roomID].push(socket.id);
    } else {
      console.log('Create');
      rooms[roomID] = [socket.id];
    }
    const otherUser = rooms[roomID].find((id) => id !== socket.id);
    if (otherUser) {
      console.log('[otherUser fired and user joined fired]');
      socket.emit('otherUser', otherUser);
      socket.to(otherUser).emit('user joined', socket.id);
    }
  });

  socket.on('offer', (payload) => {
    console.log('[offer fired]', payload);
    io.to(payload.target).emit('offer', payload);
  });

  socket.on('answer', (payload) => {
    console.log('[answer fired]', payload);
    io.to(payload.target).emit('answer', payload);
  });

  socket.on('ice-candidate', (incoming) => {
    console.log('[ice-candidate fired]');
    io.to(incoming.target).emit('ice-candidate', incoming.candidate);
  });
});

const PORT = 9000;
server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
