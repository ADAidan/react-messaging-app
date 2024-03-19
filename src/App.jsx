import * as React from 'react';
import SearchAppBar from './components/Appbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Messages from './pages/Messages';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <>
      <BrowserRouter>
          <SearchAppBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}
