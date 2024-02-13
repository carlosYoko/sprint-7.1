interface RoomsFormProps {
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  newRoomName: string;
  setNewRoomName: React.Dispatch<React.SetStateAction<string>>;
  handleAccept: () => void;
}

function RoomsForm({
  roomName,
  setRoomName,
  newRoomName,
  setNewRoomName,
  handleAccept,
}: RoomsFormProps) {
  return (
    <>
      <select value={roomName} onChange={(e) => setRoomName(e.target.value)}>
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
    </>
  );
}

export default RoomsForm;
