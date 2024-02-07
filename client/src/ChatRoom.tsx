import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type TPropsName = {
  userName: string;
  roomName: string;
};

function ChatRoom({ userName, roomName }: TPropsName) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);

    // Únete a la sala especificada
    socket.emit('joinRoom', roomName);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomName]);

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
      <div className="div-chat">
        {messages.map((mensaje, index) => (
          <p key={index}>{mensaje}</p>
        ))}
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
