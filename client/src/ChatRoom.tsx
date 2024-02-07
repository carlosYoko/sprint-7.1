import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import BackToHomeButton from './BackToHomeButton';

type TPropsName = {
  userName: string;
  roomName: string;
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChatRoom({ userName, roomName, setAccepted }: TPropsName) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [usersList, setUsersList] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);

    // Unirse a la sala especificada
    socket.emit('joinRoom', roomName, userName);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Escuchar la actualización de la lista de usuarios cuando alguien se desconecta
    socket.on('usersList', (updatedUserList) => {
      setUsersList(updatedUserList);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomName, userName]);

  const enviarMensaje = (newMessage: string) => {
    if (socket && newMessage.trim() !== '') {
      socket.emit('message', `${userName}: ${newMessage}`);
      setMessages((prevMessages) => [
        ...prevMessages,
        `${userName}: ${newMessage}`,
      ]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>{roomName}</h1>
      <BackToHomeButton setAccepted={setAccepted} />{' '}
      <div className="div-container">
        <div className="div-chat">
          {messages.map((mensaje, index) => (
            <p key={index}>{mensaje}</p>
          ))}
        </div>
        <div className="div-users">
          {usersList.map((user, index) => (
            <p key={index}>{user}</p>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={() => enviarMensaje(newMessage)}>Enviar</button>
    </div>
  );
}

export default ChatRoom;
