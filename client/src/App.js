import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css'

import { AuthProvider } from './context/authContext';

import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <AuthProvider>
   <Router>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/user' element={<UserProfile/>}/>
    </Routes>  
   </Router>
   </AuthProvider>
  );
}

export default App;
