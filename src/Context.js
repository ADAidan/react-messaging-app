import { createContext } from "react";

const UserContext = createContext({
  username: "",
  profilePicture: null,
  status: "",
  setUsername: () => {},
  setProfilePicture: () => { },
  setStatus: () => {},
});

export default UserContext;
