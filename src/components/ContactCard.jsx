/* eslint-disable no-underscore-dangle */
import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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

function ContactCard({ contact }) {
  const userId = sessionStorage.getItem("user");

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/accept-contact-request`,
        { userId, contactId: contact._id },
      );

      if (!response) {
        throw new Error("Failed to accept contact request");
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          throw new Error("Invalid contact ID");
        case 404:
          throw new Error("User not found");
        default:
          throw new Error("Error accepting contact request:", error);
      }
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/reject-contact-request`,
        { userId, contactId: contact._id },
      );

      if (!response) {
        throw new Error("Failed to reject contact request");
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          throw new Error("Invalid contact ID");
        case 404:
          throw new Error("User not found");
        default:
          throw new Error("Error rejecting contact request:", error);
      }
    }
  };

  return (
    <Paper
      data-testid="contact-card"
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
        {contact.status === "Online" && (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <DynamicAvatar name={contact.username} />
          </StyledBadge>
        )}
        {contact.status === "Offline" && (
          <StyledOfflineBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <DynamicAvatar name={contact.username} />
          </StyledOfflineBadge>
        )}
        {contact.status === "Away" && (
          <StyledAwayBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <DynamicAvatar name={contact.username} />
          </StyledAwayBadge>
        )}
        {contact.status === "incoming contact request" && (
          <DynamicAvatar name={contact.username} />
        )}
        {contact.status === "outgoing contact request" && (
          <DynamicAvatar name={contact.username} />
        )}
        <Stack>
          <Typography variant="subtitle1" component="p" sx={{ m: 0 }}>
            {contact.username}
          </Typography>
          <Typography variant="body2" component="p" sx={{ m: 0, p: 0 }}>
            {contact.status[0].toUpperCase() + contact.status.slice(1)}
          </Typography>
        </Stack>
        {contact.status === "incoming contact request" && (
          <Stack direction="row">
            <Button onClick={handleAccept}>Accept</Button>
            <Button onClick={handleReject}>Reject</Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

ContactCard.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
};

export default ContactCard;
