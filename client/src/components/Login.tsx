import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

const Login = () => {
  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    if (newUserName !== '' && newPassword !== '') {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: newUserName,
            password: newPassword,
          }),
        });

        if (response.ok) {
          console.log('Usuario creado correctamente');
          navigate('/rooms-form', { state: { userName: newUserName } });
        } else {
          const errorMessage = await response.text();
          alert('Error: ' + errorMessage);
        }
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        alert('Error al crear el usuario. Por favor, inténtalo de nuevo.');
      }
    } else {
      alert('Rellena todos los campos!');
    }
  };

  const handleLogin = async () => {
    if (loginUserName !== '' && loginPassword !== '') {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: loginUserName,
            password: loginPassword,
          }),
        });

        if (response.ok) {
          console.log('Inicio de sesión exitoso');
          navigate('/rooms-form', { state: { userName: loginUserName } });
        } else {
          const errorMessage = await response.text();
          console.error('Error:', errorMessage);
          alert('Error: ' + errorMessage);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    } else {
      alert('Rellena todos los campos!');
    }
  };

  return (
    <>
      <h1>Chat - WebSockets</h1>
      <h2>Crear Usuario</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <button onClick={handleCreateUser}>Guardar Usuario</button>

      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={loginUserName}
        onChange={(e) => setLoginUserName(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Entrar</button>
      <br />
      <GoogleLoginButton />
    </>
  );
};

export default Login;
