import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Appbar';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { UserContext } from './Context';

export default function App() {
  const [username, setUsername] = React.useState('AidanDyer');
  const [profilePicture, setProfilePicture] = React.useState('');
  const [contacts, setContacts] = React.useState([]);
  const [directMessages, setDirectMessages] = React.useState([]);
  const [status, setStatus] = React.useState('online');


  React.useEffect(() => {
    setContacts([
      {
        id: 1,
        username: 'Seymour Wade'
      },
      {
        id: 2,
        username: 'Kaiya Mccarthy'
      },
      {
        id: 3,
        username: 'Brooks Sosa'
      },
      {
        id: 4,
        username: 'Anton Boone'
      },
      {
        id: 5,
        username: 'Hung Buchanan'
      },
    ]);
    setDirectMessages([
      {
        id: 1,
        username: 'Seymour Wade'
      },
      {
        id: 2,
        username: 'Kaiya Mccarthy'
      },
      {
        id: 3,
        username: 'Brooks Sosa'
      },
      {
        id: 4,
        username: 'Anton Boone'
      },
      {
        id: 5,
        username: 'Hung Buchanan'
      },
    ]);
  }, []);

  const UserContextValue = {
    username,
    profilePicture,
    contacts,
    directMessages,
    status,
  }

  return (
    <>
    <UserContext.Provider value={UserContextValue} >
      <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}