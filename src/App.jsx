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
  const [username, setUsername] = React.useState('');
  const [profilePicture, setProfilePicture] = React.useState('');
  const [contacts, setContacts] = React.useState([]);
  const [directMessages, setDirectMessages] = React.useState([]);
  const [status, setStatus] = React.useState('');


  React.useEffect(() => {
    setUsername('AidanDyer');
    setProfilePicture('https://avatars.githubusercontent.com/u/77445921');
    setStatus('Online');
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
        username: 'Seymour Wade',
        messages: [
          {
            id: 1,
            author: 'Seymour Wade',
            text: 'What time are you available for a meeting?',
            time: '10:57 PM'
          },
          {
            id: 2,
            author: 'AidanDyer',
            text: 'I am available at 3:30 PM tomorrow.',
            time: '10:57 PM'
          },
          {
            id: 3,
            author: 'Seymour Wade',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus orci ac auctor augue mauris augue neque gravida in.',
            time: '11:58 PM'
          }
        ]
      },
      {
        id: 2,
        username: 'Kaiya Mccarthy',
        messages: [
          {
            id: 1,
            author: 'Kaiya Mccarthy',
            text: 'Hello!',
            time: '10:00 AM'
          },
        ]
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