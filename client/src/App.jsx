import { useState, useEffect } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import {Loader} from 'lucide-react'

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import Signup from './pages/Signup';
import { useAuthStore } from './store/useAuth.store';

function App() {
 const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

 useEffect(() => {
   checkAuth();
 }, [checkAuth]);

 console.log({authUser});
 
//  if(!isCheckingAuth && !authUser  ) return (
//     <div className="flex items-center justify-center h-screen">
//       <Loader className="size-10 animate-spin"></Loader>
  
//   </div>
//  )



  return (
    <>
     <div className="">
      <Navbar/>
       <Routes>
      <Route path="/" element={ <Home/> }></Route>
      <Route path="/signup" element={<Signup/> }></Route>
      <Route path="/login" element={ <Login/> }></Route>
      <Route path="/setting" element={<Setting/>}></Route>
      <Route path="/profile" element={ <Profile/> }></Route>

     </Routes>
     {/* <Routes>
      <Route path="/" element={authUser  ? <Home/> : <Navigate to="/login" />}></Route>
      <Route path="/signup" element={authUser  ? <Signup/> : <Navigate to="/" />}></Route>
      <Route path="/login" element={authUser  ? <Login/> : <Navigate to="/" />}></Route>
      <Route path="/setting" element={<Setting/>}></Route>
      <Route path="/profile" element={authUser  ? <Profile/> : <Navigate to="/login" />}></Route>

     </Routes> */}
     </div>
       
    </>
  )
}

export default App
