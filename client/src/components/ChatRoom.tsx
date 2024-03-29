import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

type TMessages = {
  content: string;
  createdAt: string;
  userName: string;
  __v: number;
  _id: string;
};

function ChatRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location.state.userName;
  const roomName = location.state.roomName;
  const isNewRoom = location.state?.isNewRoom;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [usersList, setUsersList] = useState<string[]>([]);
  const [messages, setMessages] = useState<Partial<TMessages>[]>([]);
  const [newMessageInput, setNewMessageInput] = useState<string>('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);

    if (!isNewRoom) {
      socket.emit('joinRoom', roomName, userName);
    } else {
      socket.emit('createRoom', roomName);
      socket.emit('joinRoom', roomName, userName);
    }

    socket.emit('getPreviousMessages', roomName);

    socket.on('previousMessages', (messages) => {
      setMessages((prevMessages) => [...prevMessages, ...messages]);
    });

    socket.on('usersList', (usersInRoom) => {
      setUsersList(usersInRoom);
    });

    socket.on('message', (message) => {
      console.log('mensaje nuevo:', message.content);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomName, userName, isNewRoom]);

  useEffect(() => {
    const chatDiv = document.querySelector('.div-chat');
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages]);

  const handleReturn = () => {
    navigate('/rooms-form', { state: { userName } });
  };

  const handleExitApp = () => {
    navigate('/');
  };

  const handleSendNewMessage = (newMessage: string) => {
    if (socket && newMessage.trim() !== '') {
      const messageContent = `${userName}: ${newMessage}`;
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: messageContent },
      ]);
      socket.emit('message', messageContent, roomName);
    }
  };

  return (
    <div>
      <h1>{roomName}</h1>
      <p>Hola, {userName}!</p>
      <div className="div-container">
        <div className="div-chat">
          {messages.map((msg, i) => (
            <p key={i}>{msg.content}</p>
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
