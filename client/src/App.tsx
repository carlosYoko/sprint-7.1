import { useState } from 'react';
import ChatRoom from './ChatRoom';
import './App.css';

function Home() {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [newRoomName, setNewRoomName] = useState(''); // Nuevo estado para el nombre de la nueva sala
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (userName.trim() !== '' && roomName.trim() !== '') {
      setAccepted(true);
    }
  };

  const handleCreateNewRoom = () => {
    if (newRoomName.trim() !== '') {
      setAccepted(true);
      setRoomName(newRoomName); // Establece el nombre de la nueva sala como la sala seleccionada
    }
  };

  return (
    <div>
      {!accepted ? (
        <div>
          <h1>WebSockets Chat</h1>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <select
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          >
            <option value="">Selecciona una sala</option>
            <option value="Backend-coffee">Backend Coffee</option>
            <option value="Off-topic">Off-topic</option>
          </select>
          <button onClick={handleAccept}>Entrar</button>
          <br />
          {/* Nuevo campo de entrada para el nombre de la nueva sala */}
          <input
            type="text"
            placeholder="Ingresa el nombre de la nueva sala"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          {/* Botón para crear una nueva sala */}
          <button onClick={handleCreateNewRoom}>Entrar nueva sala</button>
        </div>
      ) : (
        <ChatRoom userName={userName} roomName={roomName} />
      )}
    </div>
  );
}

export default Home;
