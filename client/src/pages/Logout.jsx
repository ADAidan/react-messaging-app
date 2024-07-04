/* eslint-disable no-console */
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { persistor } from "../app/store";
import { logoutAction } from "../features/userData/userDataSlice";

// Log the user out and redirect to the login page
function Logout() {
  const user = useSelector((state) => state.userData.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = user?.id;
  React.useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const logOutUser = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          { userId },
          { withCredentials: true },
        );

        if (response.status === 200) {
          socket.emit("ChangeUserStatus", {
            id: response.id,
            status: "Offline",
          });
          persistor.purge();
          dispatch(logoutAction());

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
