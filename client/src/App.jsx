import { useState, useEffect } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import {Loader} from 'lucide-react'

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import { useAuthStore } from './store/useAuth.store';
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();


  console.log({ onlineUsers });

  

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
     
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <Navbar/>
      

     <Routes>
       <Route path="/" element={ <Home/> }></Route>
   <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to="/login" />} />
<Route path="/login" element={!authUser ? <Login/> : <Navigate to="/" />} />
       {/* <Route path="/login" element={authUser  ? <Login/> : <Navigate to="/" />}></Route> */}
     
       
<Route path="/profile" element={ <Profile/> }></Route>
       {/* <Route path="/profile" element={authUser  ? <Profile/> : <Navigate to="/login" />}></Route> */}

     </Routes>
        <Toaster />

     </div>
          
    </>
  )
}

export default App



    // <Routes>
    //   <Route path="/" element={ <Home/> }></Route>
    //   {/* <Route path="/signup" element={<Signup/> }></Route> */}
    //   <Route path="/login" element={ <Login/> }></Route>
   
    //   <Route path="/profile" element={ <Profile/> }></Route>

    //  </Routes>