import { useState } from 'react';
import ChatRoom from './ChatRoom';
import './App.css';

function Home() {
  const [userName, setUserName] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (userName.trim() !== '') {
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
          <button onClick={handleAccept}>Entrar</button>
        </div>
      ) : (
        <ChatRoom userName={userName} />
      )}
    </div>
  );
}

export default Home;
