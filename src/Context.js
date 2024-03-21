import { createContext } from 'react';

export const UserContext = createContext({
  username: '',
  profilePicture: null,
  contacts: [],
  directMessages: [],
  status: '',
  settings: {
    theme: 'light',
    notifications: false,
  },
  setUsername: () => {},
  setProfilePicture: () => {},
  setContacts: () => {},
  setDirectMessages: () => {},
  setStatus: () => {},
  setSettings: () => {},
});
