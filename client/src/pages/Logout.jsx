/* eslint-disable no-console */
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../socket";

// Log the user out and redirect to the login page
function Logout() {
  const user = useSelector((state) => state.userData.user);

  const navigate = useNavigate();

  const userId = user?.id;
  React.useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const logOutUser = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {
            userId,
          },
        );

        if (response.status === 200) {
          socket.emit("ChangeUserStatus", { id: userId, status: "Offline" });

          navigate("/login");
        } else {
          console.error("Failed to log out user");
        }

        return response.status;
      } catch (error) {
        console.error("Unexpected error:", error);
        return false;
      }
    };
    logOutUser();
  }, []);

  return null;
}

export default Logout;
