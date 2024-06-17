import * as React from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Appbar";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import UserContext from "./Context";

export default function App() {
  const [username, setUsername] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    const getUserData = async () => {
      const userID = sessionStorage.getItem("user");
      if (!userID) {
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userID}`,
        );
        const userData = response.data;
        setUsername(userData.username);
        setProfilePicture(userData.profilePicture);
        setStatus(userData.status);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Axios Error:", error);
      }
    };
    getUserData();
  });

  const UserContextValue = React.useMemo(
    () => ({
      username,
      profilePicture,
      status,
    }),
    [username, profilePicture, status],
  );

  return (
    <UserContext.Provider value={UserContextValue}>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
