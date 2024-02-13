import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RoomsForm = () => {
  const location = useLocation();
  const userName = location.state?.userName;

  const [roomName, setRoomName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const isNewRoom = 'hello';

  const navigate = useNavigate();

  const handleSelectRoom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomName(e.target.value);
    navigate('/chat-room', { state: { userName, roomName: e.target.value } });
  };

  const handleCreateRoom = () => {
    if (newRoomName.trim() !== '') {
      console.log('Creando nueva sala:', newRoomName);
      const roomName = newRoomName;
      navigate('/chat-room', { state: { userName, roomName, isNewRoom } });
    }
  };

  const handleExitApp = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Salas de chat</h2>
      <p>Hola {userName}!</p>
      <p>Elige o crea una nueva sala</p>
      <select value={roomName} onChange={handleSelectRoom}>
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
      <br />
      <button onClick={handleCreateRoom} disabled={newRoomName.trim() === ''}>
        Crear nueva sala
      </button>
      <br />
      <button onClick={handleExitApp}>Salir </button>
    </div>
  );
};

export default RoomsForm;
