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
  const [messageValue, setMessageValue] = React.useState("");

  const userId = sessionStorage.getItem("user");

  const sendMessage = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/send-message`,
        { userId, conversationId: selectedChat, messageContent: messageValue },
      );

      if (!response) {
        throw new Error("Failed to send messageValue");
      }

      const { room, message } = response.data;
      socket.emit("sendMessage", room, message);
    } catch (error) {
      switch (error.response.status) {
        case 400:
          throw new Error("Invalid contact ID");
        case 404:
          throw new Error("User not found");
        default:
          throw new Error("Error sending messageValue:", error);
      }
    }
  };

  const handleClickSendMessage = () => {
    if (!messageValue) return;
    sendMessage();
    setMessageValue("");
  };

  const handleMouseDownMessage = (e) => {
    e.preventDefault();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        width: "100%",
        borderTop: "2px solid #f3f3f3",
      }}
    >
      <Box
        component="form"
        px={2}
        py={1}
        sx={{
          display: "flex",
          width: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-messageValue">
            Message
          </InputLabel>
          <Input
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            id="standard-adornment-messageValue"
            aria-label="messageValue-input"
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Send Message">
                  <IconButton
                    aria-label="send messageValue"
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
