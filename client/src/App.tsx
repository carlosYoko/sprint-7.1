import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import RoomsForm from './components/RoomsForm';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Login />} />
      <Route path={'/rooms-form'} element={<RoomsForm />} />
      <Route path={'/chat-room'} element={<ChatRoom />} />
    </Routes>
  );
}

export default App;
