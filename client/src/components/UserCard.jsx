/* eslint-disable no-underscore-dangle */
import * as React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import socket from "../socket";
import DynamicAvatar from "./DynamicAvatar";

function UserCard({ user }) {
  const userId = useSelector((state) => state.userData.user.id);

  // Sends a contact request to the user when the add button is clicked
  const handleAdd = () => {
    try {
      axios
        .put(`${import.meta.env.VITE_API_URL}/users/send-contact-request`, {
          userId,
          contactId: user._id,
        })
        .then(() => {
          const newPending = {
            _id: user._id,
            username: user.username,
            profilePicture: "",
            status: "outgoing contact request",
          };
          socket.emit(
            "UpdatePendingContacts",
            userId,
            newPending, // adds [ undefined ] to the userPending array);
          );
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              throw new Error("Invalid user ID");
            case 404:
              throw new Error("User not found");
            default:
              throw new Error("Error sending contact request:", error);
          }
        });
    } catch (error) {
      switch (error.response.status) {
        case 400:
          throw new Error("Invalid user ID");
        case 404:
          throw new Error("User not found");
        default:
          throw new Error("Error sending contact request:", error);
      }
    }
  };

  return (
    <Paper
      data-testid="user-card"
      elevation={0}
      sx={{
        p: 1,
        "&:hover": {
          bgcolor: "rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <DynamicAvatar name={user.username} />
          <Typography variant="subtitle1" component="p" sx={{ m: 0 }}>
            {user.username}
          </Typography>
        </Stack>
        <Box>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
