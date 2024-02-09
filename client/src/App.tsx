import { useState } from 'react';
import Login from './Login';
import ChatRoom from './ChatRoom';
import RoomsForm from './RoomsForm';
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
          <RoomsForm
            roomName={roomName}
            setRoomName={setRoomName}
            setNewRoomName={setNewRoomName}
            newRoomName={newRoomName}
            handleAccept={handleAccept}
          />
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
