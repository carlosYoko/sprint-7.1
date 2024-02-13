import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

function ChatRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location.state.userName;
  const roomName = location.state.roomName;
  const isNewRoom = location.state?.isNewRoom;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [usersList, setUsersList] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessageInput, setNewMessageInput] = useState<string>('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);
    if (!isNewRoom) {
      socket.emit('joinRoom', roomName, userName);
    } else {
      socket.emit('createRoom', roomName);
      socket.emit('joinRoom', roomName, userName);
      console.log('sala creada', roomName);
    }

    socket.on('message', (msg) => {
      setMessages([...messages, msg]);
    });

    socket.on('usersList', (usersInRoom) => {
      setUsersList(usersInRoom);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages, roomName, userName, isNewRoom]);

  const handleReturn = () => {
    navigate('/rooms-form', { state: { userName } });
  };

  const handleExitApp = () => {
    navigate('/');
  };

  const handleSendNewMessage = (newMessage: string) => {
    if (socket && newMessage.trim() !== '') {
      socket.emit('message', `${userName}: ${newMessage}`);
      setMessages([...messages, `${userName}: ${newMessage}`]);
    }
  };

  return (
    <div>
      <h1>{roomName}</h1>
      <p>Hola, {userName}!</p>
      <div className="div-container">
        <div className="div-chat">
          {messages.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
        <div className="div-users">
          {usersList.map((user, i) => (
            <p key={i}>{user}</p>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="..."
          value={newMessageInput}
          onChange={(e) => setNewMessageInput(e.target.value)}
        />
        <button
          onClick={() => {
            handleSendNewMessage(newMessageInput);
            setNewMessageInput('');
            console.log(newMessageInput);
          }}
        >
          Enviar
        </button>
      </div>
      <button onClick={handleReturn}>Volver</button>
      <button onClick={handleExitApp}>Salir </button>
    </div>
  );
}

export default ChatRoom;
