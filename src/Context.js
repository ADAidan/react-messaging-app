import { createContext } from 'react';

const UserContext = createContext({
  username: '',
  profilePicture: '',
  setProfilePicture: () => {},
  setUsername: () => {},
  Contacts: [],
  setContacts: () => {},
  directMessages: [],
  setDirectMessages: () => {},
  status: '',
  setStatus: () => {},
});

export default UserContext;