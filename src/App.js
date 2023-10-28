import './App.css';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';
import AskQ from './routes/AskQ/AskQ';
import { Routes, Route } from 'react-router-dom';
import SearchAns from './routes/SearchAns/SearchAns';


function App() {
  return (
    <div className='app-main'>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/profile" element={<Profile />}/>
       <Route path="/askQ" element={<AskQ/>}/>
       <Route path="/searchAns" element={<SearchAns/>}/>
    </Routes>
    </div>
  );
}

export default App;
