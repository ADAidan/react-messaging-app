import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DynamicAvatar from "./DynamicAvatar";

export function MessageContent({ content, bgColor = "#f3f3f3" }) {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: 1,
        marginBottom: 1,
        backgroundColor: bgColor,
      }}
    >
      <Typography
        variant="body2"
        component="p"
        sx={{
          color: bgColor === "#1e90ff" ? "white" : "black",
        }}
      >
        {content}
      </Typography>
    </Paper>
  );
}

export function Message({ messageHeader, children }) {
  return (
    <Stack data-testid="message">
      <Stack paddingX={1}>
        <Stack
          direction="row"
          spacing={1}
          p={1}
          alignItems="start"
          justifyContent="space-between"
        >
          <DynamicAvatar name={messageHeader.author} />
          <Stack
            sx={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "baseline",
              }}
            >
              <Typography
                variant="subtitle1"
                component="h3"
                data-testid="message-author"
              >
                {messageHeader.author}
              </Typography>
              <Typography
                variant="caption"
                component="p"
                data-testid="message-time"
              >
                {messageHeader.time}
              </Typography>
            </Stack>
            {children}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

MessageContent.propTypes = {
  content: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

Message.propTypes = {
  messageHeader: PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
