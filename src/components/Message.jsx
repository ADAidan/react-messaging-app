import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AccessTime } from '@mui/icons-material';

function Message({ message }) {
  return (
    <Grid
      data-testid={`message-${message.id}`}
      item
      xs={12}
    >
      <Paper elevation={3}>
        <Box paddingX={1}>
          <Typography variant="subtitle1" component="h3">
            {message.author}
          </Typography>
          <Typography variant="body2" component="p">
            {message.text}
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          >
            <AccessTime sx={{
              width: 15,
              height: 15,
            }}
            />
            <Typography variant="caption" component="p">
              {message.time}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
