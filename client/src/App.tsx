import { useState } from 'react';
import ChatRoom from './ChatRoom';
import './App.css';

function Home() {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (userName.trim() !== '' && roomName.trim() !== '') {
      setAccepted(true);
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
        </div>
      ) : (
        <ChatRoom userName={userName} roomName={roomName} />
      )}
    </div>
  );
}

export default Home;
