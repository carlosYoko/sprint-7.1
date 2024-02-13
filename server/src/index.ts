import http from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';
import Message from './models/Message';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

type Rooms = {
  [key: string]: string[];
};

const rooms: Rooms = {
  'backend-coffee': [],
  'off-topic': [],
};

interface CustomSocket extends Socket {
  room?: string;
  userName?: string;
}

io.on('connection', (socket: CustomSocket) => {
  console.log('Usuario conectado');

  socket.on('message', async (msg) => {
    console.log(`Mensaje recibido: ${msg}`);

    try {
      const message = new Message({
        content: msg,
        userName: socket.userName!,
      });
      await message.save();
      console.log('Mensaje guardado en la base de datos');
    } catch (error) {
      console.error('Error al guardar el mensaje en la base de datos:', error);
    }

    socket.to(socket.room!).emit('message', msg);
  });

  socket.on('createRoom', (roomName: string) => {
    console.log(rooms);
    if (!rooms[roomName]) {
      rooms[roomName] = [];
      socket.join(roomName);
      socket.room = roomName;
      socket.emit('createRoom', roomName);
    } else {
      socket.emit('error', 'La sala ya existe');
    }
  });

  socket.on('joinRoom', (roomName: string, userName: string) => {
    socket.join(roomName);
    socket.room = roomName;
    socket.userName = userName;

    rooms[roomName].push(userName);

    const usersInRoom = rooms[roomName];
    console.log(`Usuarios en la sala ${roomName}:`, usersInRoom);

    io.to(roomName).emit('usersList', usersInRoom);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');

    const roomName = socket.room;

    const userName = socket.userName;

    if (roomName && rooms[roomName] && rooms[roomName].includes(userName!)) {
      rooms[roomName] = rooms[roomName].filter((user) => user !== userName);

      io.to(roomName).emit('usersList', rooms[roomName]);
      console.log(
        `Usuarios en la sala ${roomName} después de la desconexión:`,
        rooms[roomName]
      );
    }
  });
});

const PORT = 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/it_chat')
  .then(() => {
    console.log('Conexión a MongoDB establecida correctamente');

    server.listen(PORT, () => {
      console.log(`Servidor Socket.IO escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });
