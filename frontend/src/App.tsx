import React from 'react'
import { Route,Routes } from "react-router-dom";
import Login from './pages/Login';
import Chat from './pages/Chat';
import Signup from './pages/Signup';

const App:React.FC = () => {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/chat' element={<Chat/>}/>  
      <Route path='/chat/:id' element={<Chat/>}/>  
    </Routes>
    </>
  )
}

export default App