import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom';
import './App.css'

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import Signup from './pages/Signup';
import { useAuthStore } from './store/useAuth.store';

function App() {
 const {authUser, checkAuth} = useAuthStore();

 useEffect(() => {
   checkAuth();
 }, [checkAuth]);

 console.log(authUser);

  return (
    <>
     <div className="">
      <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/setting" element={<Setting/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>

     </Routes>
     </div>
       
    </>
  )
}

export default App
