import * as React from 'react';
import SearchAppBar from './components/appbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';

export default function App() {
  return (
    <>
      <BrowserRouter>
          <SearchAppBar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}
