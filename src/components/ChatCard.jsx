/* eslint-disable no-underscore-dangle */
import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import styled from "@mui/material/styles/styled";
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

function ChatCard({ chat, setSelectedChat }) {
  const handleClick = () => {
    setSelectedChat(chat._id);
  };
  return (
    <Paper
      test-dataid="chat-card"
      aria-label={chat.username}
      onClick={handleClick}
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
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <DynamicAvatar name={chat.username} />
        </StyledBadge>
        <Stack>
          <Typography variant="subtitle1" component="p" sx={{ m: 0 }}>
            {chat.username}
          </Typography>
          <Typography variant="body2" component="p" sx={{ m: 0, p: 0 }}>
            Lorem ipsum dolor sit amet...
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

ChatCard.propTypes = {
  chat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  setSelectedChat: PropTypes.func,
};

ChatCard.defaultProps = {
  setSelectedChat: () => {},
};

export default ChatCard;
