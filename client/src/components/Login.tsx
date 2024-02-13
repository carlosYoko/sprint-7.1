import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleClickLogin = () => {
    if (userName !== '') {
      navigate('/rooms-form', { state: { userName } });
    } else {
      alert('Ingresa un nombre');
    }
  };

  return (
    <>
      <h2>Login</h2>
      <input
        type="text"
        value={userName}
        required
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <br />
      <button onClick={handleClickLogin}>Entrar</button>
    </>
  );
};

export default Login;
