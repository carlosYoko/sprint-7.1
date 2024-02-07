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
  userName?: string;
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

  socket.on('joinRoom', (roomName: string, userName: string) => {
    // Une al usuario a una sala existente
    socket.join(roomName);
    socket.room = roomName; // Almacena el nombre de la sala en la instancia de socket
    socket.userName = userName; // Almacena el nombre de usuario en la instancia de socket

    rooms[roomName].push(userName);
    // Obtén la lista actualizada de usuarios en la sala

    const usersInRoom = rooms[roomName];
    console.log(`Usuarios en la sala ${roomName}:`, usersInRoom);

    io.to(roomName).emit('usersList', usersInRoom);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');

    // Obtiene la sala de la que se desconectó el usuario
    const roomName = socket.room;

    // Obtiene el nombre de usuario del socket
    const userName = socket.userName;

    // Verifica si la sala está definida y el usuario está en ella
    if (roomName && rooms[roomName] && rooms[roomName].includes(userName!)) {
      // Elimina al usuario del arreglo de usuarios en la sala
      rooms[roomName] = rooms[roomName].filter((user) => user !== userName);

      // Emitir la lista actualizada de usuarios en la sala
      io.to(roomName).emit('usersList', rooms[roomName]);

      // Muestra la lista actualizada de usuarios en la sala en el servidor
      console.log(
        `Usuarios en la sala ${roomName} después de la desconexión:`,
        rooms[roomName]
      );
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${PORT}`);
});
