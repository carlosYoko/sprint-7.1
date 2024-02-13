import { useLocation, useNavigate } from 'react-router-dom';

function ChatRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location.state.userName;
  const roomName = location.state.roomName;

  const handleReturn = () => {
    navigate('/rooms-form', { state: { userName } });
  };

  const handleExitApp = () => {
    navigate('/');
  };

  return (
    <>
      <h1>{roomName}</h1>
      <p>{userName}</p>

      <button onClick={handleReturn}>Volver</button>
      <button onClick={handleExitApp}>Salir </button>
    </>
  );
}

export default ChatRoom;
