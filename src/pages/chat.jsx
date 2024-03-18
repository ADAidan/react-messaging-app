import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Message from '../components/message';
import MessageInput from '../components/message-input';
import ChatCard from '../components/chat-card';
import { Box, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Chat = () => {

	const handleClickAddChat = () => {
		console.info('Added new Chat');
	}

	const handleMouseDownAdd = (e) => {
		e.preventDefault();
	}

	return (
		<Container maxWidth="lg" sx={{
			height: '100vh',
			my: 0, 
		}}>
			<Grid container spacing={2}>
				<Grid item xs={4}>
				<Paper elevation={3} sx={{
						pt: 10,
						pb: 1,
						px: 2,
						my: 0,
						height: '100vh',
						overflowY: 'auto',
						borderRadius: 0,
					}}>
						<Stack direction="row" spacing={2} sx={{
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
							<Typography 
								variant="h5" 
								component="h1" 
								sx={{ mb: 2, px: 1 }}
							>
								Direct Message
							</Typography>
							<IconButton 
								aria-label='add chat'
								onClick={handleClickAddChat}
								onMouseDown={handleMouseDownAdd}
								>
								<AddIcon />
							</IconButton>
						</Stack>
						<ChatCard />
						<ChatCard />
						<ChatCard />
						<ChatCard />
						<ChatCard /> 
						<ChatCard />
						<ChatCard />
						<ChatCard />
						<ChatCard />
						<ChatCard /> 
					</Paper>
				</Grid>
				<Grid item xs={8}>
					<Paper elevation={3} sx={{
						position: 'relative',
						pt: 10,
						pb: 1,
						px: 3,
						my: 0,
						height: '100vh',
						borderRadius: 0,
					}}>
						<Box sx={{
							overflowY: 'auto',
							p: 1,
							height: 'calc(100vh - 150px)',
						}}>
							<Grid container spacing={2}>
								<Message />
								<Message />
								<Message />
								<Message />
								<Message />
								<Message />
							</Grid>
						</Box>
						<MessageInput />
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Chat;