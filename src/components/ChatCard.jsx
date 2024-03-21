import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import styled from '@mui/material/styles/styled';
import DynamicAvatar from './DynamicAvatar';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ChatCard = ({chat}) => {
  return (
    <Paper elevation={0} sx={{ 
      p: 1,
      '&:hover' : {
        bgcolor: 'rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }
      }}>
      <Stack direction="row" spacing={2} sx={{
        alignItems: 'center',
      }}>
        <StyledBadge 
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <DynamicAvatar name={chat.username} /> 
        </StyledBadge>
        <Stack>
          <Typography variant="subtitle1" component="p" sx={{ m: 0 }}>
            {chat.username}
          </Typography>
          <Typography variant="body2" component="p" sx={{m: 0, p: 0}}>
            Lorem ipsum dolor sit amet...
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ChatCard;