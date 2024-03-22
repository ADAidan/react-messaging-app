import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send';
import { Tooltip } from '@mui/material'

const MessageInput = ({setDisplayedMessages, username}) => {
	const [message, setMessage] = React.useState('');

	const handleClickSendMessage = () => {
		if (!message) return;
		setDisplayedMessages((prevMessages) => {
			const newMessage = {
				id: prevMessages.length + 1,
				author: username,
				text: message,
				time: new Date().toLocaleTimeString(),
			};
			return [...prevMessages, newMessage];
		});
		setMessage('');
	};

	const handleMouseDownMessage = (e) => {
		e.preventDefault();
	};

  return (
    <Paper elevation={0} sx={{
			display: 'flex',
			position: 'absolute',
			width: '90%',
			bottom: 0,
			mb: 1,
		}}>
			<Box 
				component='form'
				sx={{
					display: 'flex',
					width: '100%',
				}}
				noValidate
				autoComplete='off'
			>
				<FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-message">Message</InputLabel>
          <Input
						value={message}
						onChange={(e) => setMessage(e.target.value)}
            id="standard-adornment-message"
            endAdornment={<InputAdornment position="end"
					>
						<Tooltip title="Send Message">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickSendMessage}
								onMouseDown={handleMouseDownMessage}
								edge="end"
							>
								<SendIcon />
							</IconButton>
						</Tooltip>
					</InputAdornment>}/>
        </FormControl>
			</Box>
		</Paper>
  );
};

export default MessageInput