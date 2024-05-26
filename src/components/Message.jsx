import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AccessTime } from "@mui/icons-material";

function Message({ message }) {
  return (
    <Grid data-testid="message" item xs={12}>
      <Paper elevation={3}>
        <Box paddingX={1}>
          <Typography
            variant="subtitle1"
            component="h3"
            data-testid="message-author"
          >
            {message.author.username}
          </Typography>
          <Typography variant="body2" component="p" data-testid="message-text">
            {message.content}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <AccessTime
              sx={{
                width: 15,
                height: 15,
              }}
            />
            <Typography
              variant="caption"
              component="p"
              data-testid="message-time"
            >
              {message.formattedTime}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    formattedTime: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
