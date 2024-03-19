import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Stack, Toolbar } from '@mui/material';
import { FormControl, FilledInput, InputLabel, InputAdornment, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
	const handleClickEditPassword = () => {
		console.info('You clicked the edit password button.');
	};

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

	return (
		<Container maxWidth='md'>
			<Toolbar />
			<Stack spacing={2} direction='column'>
			<Typography variant='h4' component='h2'>
				Account
			</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} >
						<TextField
							id='username'
							label='Username'
							variant='outlined'
							defaultValue={'Username'}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl sx={{ m: 0, width: '25ch' }} variant="filled">
							<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
							<FilledInput
								id="filled-adornment-password"
								type="password"
								defaultValue={'password'}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickEditPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{<EditIcon />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</Grid>
				</Grid>
				<Divider orientation='horizontal' variant='middle' flexItem/>
			</Stack>
		</Container>
	);
};

export default Profile;