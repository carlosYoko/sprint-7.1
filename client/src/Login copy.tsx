import { useState } from 'react';

type TProps = {
  onLogin: (userName: string) => void;
};

function Login({ onLogin }: TProps) {
  const [userName, setUserName] = useState('');

  const handleAccept = () => {
    if (userName.trim() !== '') {
      onLogin(userName);
    }
  };

  return (
    <div>
      <h1>WebSockets chat app</h1>
      <input
        type="text"
        placeholder="Ingresa tu nombre"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleAccept}>Aceptar</button>
    </div>
  );
}

export default Login;
