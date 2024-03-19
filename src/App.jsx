import * as React from 'react';
import SearchAppBar from './components/appbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

export default function App() {
  return (
    <>
      <BrowserRouter>
          <SearchAppBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}
