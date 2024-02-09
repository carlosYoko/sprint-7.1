import { useState } from 'react';
import Login from './Login';
import ChatRoom from './ChatRoom';
import './App.css';

function Home() {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleLogin = (userName: string) => {
    setUserName(userName);
    setAccepted(true);
  };

  const handleAccept = () => {
    if (roomName.trim() !== '' || newRoomName.trim() !== '') {
      setAccepted(true);
    }
  };

  return (
    <div>
      {!accepted ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h1>Bienvenido, {userName}!</h1>
          <select
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          >
            <option value="">Selecciona una sala</option>
            <option value="backend-coffee">Backend Coffee</option>
            <option value="off-topic">Off-topic</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Nombre nueva sala"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button onClick={handleAccept}>Entrar</button>
        </div>
      )}
      {accepted && (roomName.trim() !== '' || newRoomName.trim() !== '') && (
        <ChatRoom
          userName={userName}
          roomName={roomName.trim() !== '' ? roomName : newRoomName}
          setAccepted={setAccepted}
        />
      )}
    </div>
  );
}

export default Home;
