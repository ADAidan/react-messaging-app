import { createContext } from "react";

const UserContext = createContext({
  username: "",
  profilePicture: null,
  contacts: [],
  directMessages: [],
  pending: [],
  status: "",
  settings: {
    theme: "light",
    notifications: false,
  },
  setUsername: () => {},
  setProfilePicture: () => {},
  setContacts: () => {},
  setDirectMessages: () => {},
  setPending: () => {},
  setStatus: () => {},
  setSettings: () => {},
});

export default UserContext;
