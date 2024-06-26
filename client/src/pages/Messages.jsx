/* eslint-disable no-underscore-dangle */
import * as React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Stack, Toolbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import ChatCard from "../components/ChatCard";
import NoMessages from "../components/NoMessages";
import NoDirectMessages from "../components/NoDirectMessages";
import AddConversationModal from "../components/AddConversationModal";

const formatTime = (isoString) => {
  const date = new Date(isoString);

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleTimeString("en-US", options);
};

function Messages() {
  const userId = sessionStorage.getItem("user");
  const messageContainerRef = React.useRef(null);
  const [directMessages, setDirectMessages] = React.useState([]);
  const [displayedMessages, setDisplayedMessages] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [open, setOpen] = React.useState(false); // AddModal open state
  const [userContacts, setUserContacts] = React.useState([]); // contacts to display on the AddModal

  const navigate = useNavigate();

  // If user is not logged in, redirect to login page
  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/protected`, {
        withCredentials: true,
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log("accessed protected route");
      })
      .catch(() => {
        navigate("/logout");
      });
  }, []);

  // Join chat room
  const handleJoinChat = (chatId) => {
    setSelectedChat(chatId);
    socket.emit("JoinRoom", chatId);
  };

  const getContactData = (participants) => {
    const contact = participants.find(
      (participant) => participant._id !== userId,
    );
    if (!contact.username && !contact.profilePicture) {
      return {
        contactName: "Unknown",
        contactProfilePicture: "",
        contactStatus: "Unknown",
      };
    }
    return {
      contactName: contact.username,
      contactProfilePicture: contact.profilePicture,
      contactStatus: contact.status,
      contactId: contact._id,
    };
  };

  // Socket event listener for adding a new conversation
  React.useEffect(() => {
    const handleNewConversation = async (conversation) => {
      const contactId = conversation.participants.find(
        (participant) => participant !== userId,
      );
      if (!contactId) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${contactId}/info`, // gets the contacts info for the chat card
        );
        const userData = response.data;

        const newChat = {
          _id: conversation._id,
          username: userData.username,
          status: userData.status,
          profilePicture: userData.profilePicture,
          messages: [],
        };

        setDirectMessages((prevChats) => [...prevChats, newChat]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching conversation:", error);
      }
    };
    socket.on("addConversation", handleNewConversation);
    return () => {
      socket.off("addConversation");
    };
  }, [directMessages]);

  // Socket event listener for creating a new message
  React.useEffect(() => {
    socket.on("receiveMessage", (message) => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
        .then((response) => {
          const user = response.data;
          const newMessage = {
            _id: message._id,
            author: {
              username: user.username,
              profilePicture: user.profilePicture,
            },
            content: message.content,
            formattedTime: formatTime(message.createdAt),
          };
          setDisplayedMessages((prevMessages) => [...prevMessages, newMessage]);
        });
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Socket event listener for deleting a conversation
  React.useEffect(() => {
    socket.on("DeleteConversation", (conversationId) => {
      setDirectMessages((prevChats) =>
        prevChats.filter((chat) => chat._id !== conversationId),
      );
    });
    return () => {
      socket.off("DeleteConversation");
    };
  }, [directMessages]);

  React.useEffect(() => {
    if (!userId) return;
    socket.emit("JoinRoom", userId);
    const fetchUserContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}/contacts`,
        );
        const updatedContacts = response.data.map((contact) => ({
          ...contact,
          isContact: true,
        }));
        setUserContacts(updatedContacts);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Axios Error:", error);
      }
    };
    fetchUserContacts();
  }, [userId]);

  React.useEffect(() => {
    if (!messageContainerRef.current) return;
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [displayedMessages]);

  React.useEffect(() => {
    if (!userId) return;
    // eslint-disable-next-line consistent-return
    const getDirectMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}/direct-messages`,
        );
        const conversationData = response.data;
        const conversations = conversationData.map((conversation) => {
          const {
            contactName,
            contactProfilePicture,
            contactStatus,
            contactId,
          } = getContactData(conversation.participants);
          return {
            _id: conversation._id,
            contactId,
            username: contactName,
            status: contactStatus,
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
      handleJoinChat(directMessages[0]._id);
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

  const handleMouseDownAdd = (e) => {
    e.preventDefault();
  };

  const handleClickAddChat = () => {
    setOpen(true);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        my: 0,
      }}
    >
      <Stack
        direction="column"
        spacing={0}
        sx={{
          height: "100vh",
        }}
      >
        <Toolbar />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            height: "calc(100vh - 64px)",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              pb: 1,
              px: 1,
              my: 0,
              overflowY: "auto",
              borderRadius: 0,
              flex: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                p: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
                Direct Message
              </Typography>
              <IconButton
                aria-label="add chat"
                onClick={handleClickAddChat}
                onMouseDown={handleMouseDownAdd}
              >
                <AddIcon />
              </IconButton>
              <AddConversationModal
                open={open}
                setOpen={setOpen}
                setSelectedChat={setSelectedChat}
                allUsers={userContacts}
              />
            </Stack>
            {directMessages.length > 0 &&
              directMessages.map((chat) => (
                <ChatCard
                  key={chat._id}
                  chat={chat}
                  handleJoinChat={handleJoinChat}
                />
              ))}
          </Paper>
          {selectedChat ? (
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                pb: 1,
                px: 3,
                my: 0,
                borderRadius: 0,
                flex: 2,
              }}
            >
              <Stack
                spacing={0}
                sx={{
                  height: "100%",
                }}
              >
                <Stack
                  data-testid="messages-container"
                  ref={messageContainerRef}
                  spacing={2}
                  sx={{
                    overflowY: "auto",
                    p: 1,
                    flex: 1,
                  }}
                >
                  {displayedMessages.length > 0 ? (
                    displayedMessages.map((message) => (
                      <Message key={message._id} message={message} />
                    ))
                  ) : (
                    <NoMessages />
                  )}
                </Stack>
                <Box
                  sx={{
                    flexShrink: 0,
                  }}
                >
                  <MessageInput
                    setDisplayedMessages={setDisplayedMessages}
                    selectedChat={selectedChat}
                  />
                </Box>
              </Stack>
            </Paper>
          ) : (
            <Box
              sx={{
                flex: 2,
              }}
            >
              <NoDirectMessages />
            </Box>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Messages;
