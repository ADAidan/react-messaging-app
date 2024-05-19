import * as React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import ChatCard from "../components/ChatCard";
import NoMessages from "../components/NoMessages";
import NoDirectMessages from "../components/NoDirectMessages";
import UserContext from "../Context";

function Messages() {
  const user = React.useContext(UserContext);
  const messageContainerRef = React.useRef(null);
  const [directMessages, setDirectMessages] = React.useState([]);
  const [displayedMessages, setDisplayedMessages] = React.useState(null);
  const [selectedChat, setSelectedChat] = React.useState(null);

  React.useEffect(() => {
    if (!messageContainerRef.current) return;
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [displayedMessages]);

  React.useEffect(() => {
    const getDirectMessages = async () => {
      try {
        const userID = sessionStorage.getItem("user");
        const response = await axios.get(
          `http://localhost:3000/users/${userID}/direct-messages`,
        );
        const directMessagesData = response.data;
        setDirectMessages(directMessagesData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Axios Error:", error);
      }
    };
    getDirectMessages();
  }, []);

  React.useEffect(() => {
    if (!directMessages.length) return;
    setSelectedChat(1);
    const getDisplayedMessages = () => {
      const currentChat = directMessages.find(
        (chat) => chat.id === selectedChat,
      );
      if (!currentChat) return [];
      return currentChat.messages;
    };
    const messagesData = getDisplayedMessages();
    setDisplayedMessages(messagesData);
  }, [directMessages, selectedChat]);

  const handleClickAddChat = () => {
    // push a new chat to the user's directMessages
  };

  const handleMouseDownAdd = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        my: 0,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper
            elevation={3}
            sx={{
              pt: 10,
              pb: 1,
              px: 2,
              my: 0,
              height: "100vh",
              overflowY: "auto",
              borderRadius: 0,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h1" sx={{ mb: 2, px: 1 }}>
                Direct Message
              </Typography>
              <IconButton
                aria-label="add chat"
                onClick={handleClickAddChat}
                onMouseDown={handleMouseDownAdd}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            {directMessages.length > 0 &&
              directMessages.map((chat) => (
                <ChatCard
                  key={chat.id}
                  chat={chat}
                  setSelectedChat={setSelectedChat}
                />
              ))}
          </Paper>
        </Grid>
        <Grid item xs={8}>
          {selectedChat ? (
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                pt: 10,
                pb: 1,
                px: 3,
                my: 0,
                height: "100vh",
                borderRadius: 0,
              }}
            >
              <Box
                data-testid="messages-container"
                ref={messageContainerRef}
                sx={{
                  overflowY: "auto",
                  p: 1,
                  height: "calc(100vh - 150px)",
                }}
              >
                <Grid
                  data-testid={`chat-${selectedChat}`}
                  container
                  spacing={2}
                >
                  {displayedMessages ? (
                    displayedMessages.map((message) => (
                      <Message key={message.id} message={message} />
                    ))
                  ) : (
                    <NoMessages />
                  )}
                </Grid>
              </Box>
              <MessageInput
                setDisplayedMessages={setDisplayedMessages}
                username={user.username}
              />
            </Paper>
          ) : (
            <NoDirectMessages />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Messages;
