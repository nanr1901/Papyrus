import './App.css';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';
import Login from "./routes/Login/login";
import { Routes, Route } from 'react-router-dom';
import UserProvider from './providers/User';

function App() {
  return (
    <div className='app-main'>
    <UserProvider>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/profile" element={<Profile />}/>
       <Route path="/login" element={<Login />}/>
    </Routes>
    </UserProvider>
    </div>
  );
}

export default App;
