import PropTypes from "prop-types";
import * as React from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Tooltip } from "@mui/material";
import socket from "../socket";

function MessageInput({ selectedChat }) {
  const [message, setMessage] = React.useState("");

  const userId = sessionStorage.getItem("user");

  const sendMessage = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/send-message`,
        { userId, conversationId: selectedChat, messageContent: message },
      );

      if (!response) {
        throw new Error("Failed to send message");
      }

      socket.emit("newMessage", response.data);
    } catch (error) {
      switch (error.response.status) {
        case 400:
          throw new Error("Invalid contact ID");
        case 404:
          throw new Error("User not found");
        default:
          throw new Error("Error sending message:", error);
      }
    }
  };

  const handleClickSendMessage = () => {
    if (!message) return;
    sendMessage();
    setMessage("");
  };

  const handleMouseDownMessage = (e) => {
    e.preventDefault();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        position: "absolute",
        width: "90%",
        bottom: 0,
        mb: 1,
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          width: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-message">Message</InputLabel>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="standard-adornment-message"
            aria-label="message-input"
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Send Message">
                  <IconButton
                    aria-label="send message"
                    onClick={handleClickSendMessage}
                    onMouseDown={handleMouseDownMessage}
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </Paper>
  );
}

MessageInput.propTypes = {
  selectedChat: PropTypes.string.isRequired,
};

export default MessageInput;
