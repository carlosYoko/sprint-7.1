import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

// Define un tipo para las salas
type Rooms = {
  [key: string]: string[];
};

const rooms: Rooms = {
  'backend-coffee': [],
  'off-topic': [],
};

// Extiende el tipo 'Socket' para agregar la propiedad 'room'
interface CustomSocket extends Socket {
  room?: string;
}

io.on('connection', (socket: CustomSocket) => {
  console.log('Usuario conectado');

  socket.on('message', (msg) => {
    console.log(`Mensaje recibido: ${msg}`);
    // Envía el mensaje solo a los usuarios en la misma sala que el remitente
    socket.to(socket.room!).emit('message', msg);
  });

  socket.on('createRoom', (roomName: string) => {
    if (!rooms[roomName]) {
      rooms[roomName] = [];
      // Une al usuario a la nueva sala
      socket.join(roomName);
      socket.room = roomName; // Almacena el nombre de la sala en la instancia de socket
      socket.emit('createRoom', roomName);
    } else {
      socket.emit('error', 'La sala ya existe');
    }
  });

  socket.on('joinRoom', (roomName: string) => {
    // Une al usuario a una sala existente
    socket.join(roomName);
    socket.room = roomName; // Almacena el nombre de la sala en la instancia de socket
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${PORT}`);
});
