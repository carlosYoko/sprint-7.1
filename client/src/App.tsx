import { useState } from 'react';
import ChatRoom from './ChatRoom';
import './App.css';

function Home() {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (userName.trim() !== '' && roomName.trim() !== '') {
      setAccepted(true);
    }
  };

  const handleCreateNewRoom = () => {
    if (newRoomName.trim() !== '') {
      setAccepted(true);
      setRoomName(newRoomName);
    }
  };

  return (
    <div>
      {!accepted ? (
        <div>
          <h1>WebSockets chat app</h1>
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
            <option value="backend-coffee">Backend Coffee</option>
            <option value="off-topic">Off-topic</option>
          </select>
          <button onClick={handleAccept}>Entrar</button>
          <br />
          <input
            type="text"
            placeholder="Ingresa el nombre de la nueva sala"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button onClick={handleCreateNewRoom}>Entrar nueva sala</button>
        </div>
      ) : (
        <ChatRoom
          userName={userName}
          roomName={roomName}
          setAccepted={setAccepted}
        />
      )}
    </div>
  );
}

export default Home;
