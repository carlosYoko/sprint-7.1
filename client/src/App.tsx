import { useEffect } from 'react';
import { io } from 'socket.io-client';

import './App.css';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:3000');

    // Escuchar el evento 'bienvenida' y mostrar el mensaje en la consola del navegador
    socket.on('bienvenida', (mensaje) => {
      console.log(mensaje);
    });

    // Manejar la desconexión cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <>
      <div>
        <h1>Chat</h1>
        {/* Aquí puedes agregar el resto de tu interfaz de chat */}
      </div>
    </>
  );
}

export default App;
