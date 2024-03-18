import * as React from 'react';
import SearchAppBar from './components/appbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
import Profile from './pages/profile';

export default function App() {
  return (
    <>
      <BrowserRouter>
          <SearchAppBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/messages' element={<Chat />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}
