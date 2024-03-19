import * as React from 'react';
import ResponsiveAppBar from './components/Appbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Messages from './pages/Messages';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

export default function App() {
  return (
    <>
      <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}
