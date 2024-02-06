import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import './App.css';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [mensajeNuevo, setMensajeNuevo] = useState<string>('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);

    socket.on('bienvenida', (message) => {
      console.log(message);
    });

    socket.on('mensaje', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const enviarMensaje = (newMessage: string) => {
    if (socket && newMessage.trim() !== '') {
      socket.emit('mensaje', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMensajeNuevo('');
    }
  };

  return (
    <>
      <div>
        <h1>Chat</h1>
        <div className="div-chat">
          {messages.map((mensaje, index) => (
            <p key={index}>{mensaje}</p>
          ))}
        </div>
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          value={mensajeNuevo}
          onChange={(e) => setMensajeNuevo(e.target.value)}
        />
        <button onClick={() => enviarMensaje(mensajeNuevo)}>Enviar</button>
      </div>
    </>
  );
}

export default App;
