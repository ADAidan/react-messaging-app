import * as React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import EmailNotificationCheckbox from '../components/EmailNotificationCheckbox';
import TermsCheckbox from '../components/TermsCheckbox';

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="md">
      <Stack direction="column" sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <Paper elevation={3} sx={{
          p: 2,
          width: '100%',
          maxWidth: 400,
        }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: 'left',
              fontWeight: 700,
            }}
          >Sign Up</Typography>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input
              id="email-input"
              aria-describedby="email-helper-text"
            />
            <FormHelperText id="email-helper-text">
              Enter your email
            </FormHelperText>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="username-input">Username</InputLabel>
            <Input
              id="username-input"
              aria-describedby="username-helper-text"
            />
            <FormHelperText id="username-helper-text">
              Create a username
            </FormHelperText>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby='password-helper-text'
            />
            <FormHelperText id="password-helper-text">
              Create a password
            </FormHelperText>
          </FormControl>
          <EmailNotificationCheckbox />
          <TermsCheckbox />
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ 
              my: 2, 
            }}>
            Sign Up
          </Button>
          <Stack direction="row" sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Typography
              variant="body2"
              component="p"
              sx={{
                textAlign: 'left',
                fontWeight: 700,
              }}
            >Already have an account?</Typography>
              <Button variant="text" href='/login' >
                Log In
              </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default SignUp;