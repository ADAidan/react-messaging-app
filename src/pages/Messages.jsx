import * as React from "react";
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
import UserContext from "../Context";

function Messages() {
  const user = React.useContext(UserContext);
  const messageContainerRef = React.useRef(null);
  const [displayedMessages, setDisplayedMessages] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState(1);

  React.useEffect(() => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [displayedMessages]);

  React.useEffect(() => {
    if (!user.directMessages) return;
    const getDisplayedMessages = () => {
      const currentChat = user.directMessages.find(
        (chat) => chat.id === selectedChat,
      );
      if (!currentChat) return [];
      return currentChat.messages;
    };
    const messagesData = getDisplayedMessages();
    setDisplayedMessages(messagesData);
  }, [user.directMessages, selectedChat]);

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
            {user.directMessages.map((chat) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                setSelectedChat={setSelectedChat}
              />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={8}>
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
              ref={messageContainerRef}
              sx={{
                overflowY: "auto",
                p: 1,
                height: "calc(100vh - 150px)",
              }}
            >
              <Grid container spacing={2}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Messages;
