import './App.css';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';
import AskQ from './routes/AskQ/AskQ';
import GLogin from "./routes/GLogin/login";
import { Routes, Route } from 'react-router-dom';
import SearchAns from './routes/SearchAns/SearchAns';
import UserProvider from "./providers/User";
import Login from './routes/Login/login';
import SignUp from './routes/signUp';
import Answers from './routes/Answers';
import SeeQ from './routes/SeeQ/index';
import UserQ from './routes/userQ/index';
import AboutUs from './routes/About';
import { gettoken,onMessageListener } from './services/firebase';
import { notifications } from '@mantine/notifications';

function App() {
  gettoken();

  onMessageListener()
    .then((payload) => {
      notifications.show({
        title: payload.notification.title,
        message: payload.notification.body,
      })
    })
    .catch((err) => console.log("failed: ", err));
  return (
    <div className='app-main'>
    <UserProvider>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/profile" element={<Profile />}/>
       <Route path="/askQ" element={<AskQ/>}/>
       <Route path="/userQ" element={<UserQ/>}/>
       <Route path="/searchAns" element={<SearchAns/>}/>
       <Route path="/glogin" element={<GLogin />}/>
       <Route path="/login" element={<Login />}/>
       <Route path='/signup' element={<SignUp />}/>
       <Route path="/seeQ" element={<SeeQ/>}/>
       <Route path='/answers/:id' element={<Answers />}/>
       <Route path='/about'  element={<AboutUs/>}/>
       <Route path='*' element={<h1 style={{color : "white", display : "flex", justifyContent : "center", alignItems : "center"}}>Not Found</h1>} />
    </Routes>
    </UserProvider>
    </div>
  );
}

export default App;
