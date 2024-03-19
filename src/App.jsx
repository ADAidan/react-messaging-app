import * as React from 'react';
import ResponsiveAppBar from './components/Appbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Messages from './pages/Messages';

export default function App() {
  return (
    <>
      <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/messages' element={<Messages />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}
