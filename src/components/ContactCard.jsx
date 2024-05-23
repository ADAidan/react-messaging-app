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
            {contact.status}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

ContactCard.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactCard;
