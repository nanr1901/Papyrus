import './App.css';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className='app-main'>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/profile" element={<Profile />}/>
    </Routes>
    </div>
  );
}

export default App;
