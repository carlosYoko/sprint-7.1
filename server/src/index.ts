import http from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import Message from './models/Message';
import Login from './models/Login';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.get('/', (req, res) => {
  res.json({ msg: 'hello' });
});

app.post('/register', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const existingUser = await Login.findOne({ userName: userName });
    if (existingUser) {
      res.status(400).send('El nombre de usuario ya existe!');
      return;
    }

    const newUser = new Login({
      userName: userName,
      password: password,
    });
    await newUser.save();
    console.log(`Usuario ${userName} registrado correctamente`);
    res.status(201).send('Usuario registrado correctamente');
  } catch (error) {
    console.error('Hubo un error al registrar el usuario:', error);
    res.status(500).send('Hubo un error al registrar el usuario');
  }
});

app.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await Login.findOne({ userName: userName });

    if (!user) {
      res.status(404).send('Usuario no encontrado');
      return;
    }

    if (password !== user.password) {
      res.status(401).send('Contraseña incorrecta');
      return;
    }

    console.log(`Inicio de sesión exitoso para: ${userName}`);
    res.status(200).send({ userName: userName });
  } catch (error) {
    console.error('Hubo un error al iniciar sesión:', error);
    res.status(500).send('Hubo un error al iniciar sesión');
  }
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

  socket.on('getPreviousMessages', async (roomName) => {
    try {
      const messages = await Message.find({ roomName });
      socket.emit('previousMessages', messages);
    } catch (error) {
      console.error('Error al obtener los mensajes anteriores:', error);
    }
  });

  socket.on('connect', () => {
    const roomName = socket.room;
    if (roomName) {
      Message.find({})
        .then((messages) => {
          socket.emit('previousMessages', messages);
        })
        .catch((error) => {
          console.error('Error al obtener los mensajes anteriores:', error);
        });
    }
  });

  socket.on('message', async (msg, roomName) => {
    console.log(`Mensaje recibido: ${msg}`);

    try {
      const message = new Message({
        content: msg,
        userName: socket.userName!,
        roomName: roomName,
      });
      await message.save();
      console.log('Mensaje guardado en la base de datos');

      socket.to(socket.room!).emit('message', message);
    } catch (error) {
      console.error('Error al guardar el mensaje en la base de datos:', error);
    }
  });

  socket.on('createRoom', (roomName: string) => {
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
