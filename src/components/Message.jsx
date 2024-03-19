import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AccessTime } from '@mui/icons-material';

const Message = () => {
  return (
    <Grid item xs={12}>
			<Paper elevation={3}>
				<Box paddingX={1}>
					<Typography variant="subtitle1" component="h3">
						Hello World!
					</Typography>
					<Typography variant="body2" component="p">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus orci ac auctor augue mauris augue neque gravida in.
					</Typography>
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
					}}>
						<AccessTime sx={{
							width: 15,
							height: 15,
						}}/>
						<Typography variant="caption" component="p">
							11:57 PM
						</Typography>
					</Box>
				</Box>
			</Paper>
    </Grid>
  )
};

export default Message;