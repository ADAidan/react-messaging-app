/* eslint-disable no-console */
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

function Logout() {
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("user");
  React.useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const logOutUser = async () => {
      try {
        const response = await axios.put("http://localhost:3000/users/logout", {
          userId,
        });

        if (response.status === 200) {
          socket.emit("ChangeUserStatus", { id: userId, status: "Offline" });

          sessionStorage.removeItem("user");
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