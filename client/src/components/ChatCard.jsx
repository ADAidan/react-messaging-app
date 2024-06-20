/* eslint-disable no-underscore-dangle */
import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import socket from "../socket";
import DynamicAvatar from "./DynamicAvatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledOfflineBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#9e9e9e",
    color: "#9e9e9e",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const StyledAwayBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#ff9800",
    color: "#ff9800",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const EllipsisTypography = styled(Typography)({
  m: 0,
  p: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "block",
  maxWidth: "100%",
});

function ChatCard({ chat, handleJoinChat = () => {} }) {
  const userId = sessionStorage.getItem("user");
  const [anchorElOptions, setAnchorElOptions] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const open = Boolean(anchorElOptions);
  const options = ["Remove", "Leave", "Archive"];

  const removeChat = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/remove-conversation`,
        { userId, conversationId: chat._id },
      );

      if (!response) {
        throw new Error("Failed to remove conversation");
      }

      socket.emit("DeleteConversation", chat._id);

      handleJoinChat(null);
    } catch (error) {
      switch (error.response.status) {
        case 400:
          throw new Error("Invalid conversation ID");
        case 404:
          throw new Error("Conversation not found");
        default:
          throw new Error("Error removing conversation:", error);
      }
    }
  };

  const handleOpenOptionsMenu = (event) => {
    setAnchorElOptions(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElOptions(null);
  };

  const handleClickOption = (event) => {
    handleCloseUserMenu();

    switch (event.currentTarget.textContent) {
      case "Remove":
        removeChat();
        break;
      case "Leave":
        break;
      case "Archive":
        break;
      default:
    }
  };

  React.useEffect(() => {
    if (!chat.messages.length) return;
    const mostRecentMessage = chat.messages[chat.messages.length - 1].content;
    setMessage(mostRecentMessage);
  }, [chat.messages]);

  // Socket event listener for changing user status
  React.useEffect(() => {
    setStatus(chat.status);
    const handleChangeStatus = (data) => {
      setStatus((prevStatus) =>
        data.id === chat.contactId ? data.status : prevStatus,
      );
    };
    socket.on("ChangeUserStatus", handleChangeStatus);
    return () => {
      socket.off("ChangeUserStatus", handleChangeStatus);
    };
  }, [chat.status]);

  const handleClickChat = () => {
    handleJoinChat(chat._id);
    socket.emit("JoinRoom", chat._id);
  };

  return (
    <Stack
      direction="row"
      test-dataid="chat-card"
      aria-label={chat.username}
      onClick={handleClickChat}
      elevation={0}
      sx={{
        p: 1,
        borderRadius: 1,
        alignItems: "center",
        "&:hover": {
          bgcolor: "rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        },
      }}
    >
      {status === "Online" && (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <DynamicAvatar name={chat.username} />
        </StyledBadge>
      )}
      {status === "Offline" && (
        <StyledOfflineBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <DynamicAvatar name={chat.username} />
        </StyledOfflineBadge>
      )}
      {status === "Away" && (
        <StyledAwayBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <DynamicAvatar name={chat.username} />
        </StyledAwayBadge>
      )}
      <Stack
        direction="column"
        sx={{
          ml: 2,
          flexGrow: 0,
          overflow: "hidden",
        }}
      >
        <EllipsisTypography variant="subtitle1" component="p" sx={{ m: 0 }}>
          {chat.username}
        </EllipsisTypography>
        <EllipsisTypography variant="inherit" component="p">
          {message}
        </EllipsisTypography>
      </Stack>
      <Box sx={{ flexGrow: 0, ml: "auto" }}>
        <Tooltip title="Options">
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpenOptionsMenu}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{
            mt: "45px",
          }}
          slotProps={{
            paper: {
              sx: {
                width: "25ch",
              },
            },
          }}
          id="menu-appbar"
          anchorEl={anchorElOptions}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleCloseUserMenu}
        >
          {options.map((option) => (
            <MenuItem key={option} onClick={handleClickOption}>
              <Typography variant="button" component="p">
                {option}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {/* </Stack> */}
    </Stack>
  );
}

ChatCard.propTypes = {
  chat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    contactId: PropTypes.string,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        author: PropTypes.shape({
          username: PropTypes.string.isRequired,
        }).isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  handleJoinChat: PropTypes.func.isRequired,
};

export default ChatCard;
