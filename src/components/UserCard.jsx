/* eslint-disable no-underscore-dangle */
import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import socket from "../socket";
import DynamicAvatar from "./DynamicAvatar";

function UserCard({ user }) {
  const userId = sessionStorage.getItem("user");

  // Sends a contact request to the user when the add button is clicked
  const handleAdd = () => {
    try {
      axios
        .put(`http://localhost:3000/users/send-contact-request`, {
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
        }}
      >
        <DynamicAvatar name={user.username} />
        <Typography variant="subtitle1" component="p" sx={{ m: 0 }}>
          {user.username}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
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
