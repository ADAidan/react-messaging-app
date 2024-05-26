/* eslint-disable no-underscore-dangle */
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
  const [displayedMessages, setDisplayedMessages] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState(null);

  // PUT request to add a chat
  const createConversation = async (userId, contactId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/create-conversation`,
        { userId, contactId },
      );

      if (!response) {
        throw new Error("Failed to create conversation");
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          throw new Error("Invalid contact ID");
        case 404:
          throw new Error("User not found");
        default:
          throw new Error("Error creating conversation:", error);
      }
    }
  };

  const getContactData = (participants) => {
    const contact = participants.find(
      (participant) => participant._id !== sessionStorage.getItem("user"),
    );
    return {
      contactName: contact.username,
      contactProfilePicture: contact.profilePicture,
    };
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleTimeString("en-US", options);
  };

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
        const conversationData = response.data;
        const conversations = conversationData.map((conversation) => {
          const { contactName, contactProfilePicture } = getContactData(
            conversation.participants,
          );
          return {
            _id: conversation._id,
            username: contactName,
            profilePicture: contactProfilePicture,
            messages: conversation.messages,
          };
        });
        // conversationData needs to be an array of objects with username, status and profilePicture properties
        setDirectMessages(conversations);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Axios Error:", error);
      }
    };
    getDirectMessages();
  }, []);

  React.useEffect(() => {
    if (!directMessages.length) return;
    if (!selectedChat) {
      setSelectedChat(directMessages[0]._id);
      return;
    }
    const getDisplayedMessages = () => {
      const currentChat = directMessages.find(
        (chat) => chat._id === selectedChat,
      );
      if (!currentChat) return [];
      return currentChat.messages;
    };
    const messagesData = getDisplayedMessages();

    const formattedMessages = messagesData.map((message) => ({
      _id: message._id,
      author: {
        username: message.author.username,
        profilePicture: message.author.profilePicture,
      },
      content: message.content,
      formattedTime: formatTime(message.createdAt),
    }));

    setDisplayedMessages(formattedMessages);
  }, [directMessages, selectedChat]);

  const handleClickAddChat = () => {
    const userId = sessionStorage.getItem("user");
    const contactId = "661a2609af2bc0bd77b6786c";

    createConversation(userId, contactId);
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
                  key={chat._id}
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
                  {displayedMessages.length > 0 ? (
                    displayedMessages.map((message) => (
                      <Message key={message._id} message={message} />
                    ))
                  ) : (
                    <NoMessages />
                  )}
                </Grid>
              </Box>
              <MessageInput
                setDisplayedMessages={setDisplayedMessages}
                username={user.username}
                selectedChat={selectedChat}
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
