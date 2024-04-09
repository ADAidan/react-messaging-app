import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import EmailNotificationCheckbox from "../components/EmailNotificationCheckbox";
import TermsCheckbox from "../components/TermsCheckbox";

export const usernameValidate = (username) => {
  switch (true) {
    case username.length < 2:
      throw new Error("Username must be at least 2 characters");
    case username.length > 20:
      throw new Error("Username must be less than 20 characters");
    case !/^[a-zA-Z0-9_ ]*$/.test(username):
      throw new Error(
        "Username must contain only letters, numbers, spaces, and _",
      );
    default:
      return true;
  }
};

export const emailValidate = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  switch (true) {
    case !emailRegex.test(email):
      throw new Error("Invalid email format");
    case email.length > 50:
      throw new Error("Email must be less than 50 characters");
    default:
      return true;
  }
};

export const passwordValidate = (password) => {
  switch (true) {
    case password.length < 8:
      throw new Error("Password must be at least 8 characters");
    case password.length > 20:
      throw new Error("Password must be less than 20 characters");
    default:
      return true;
  }
};

function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailValue, setEmailValue] = React.useState("");
  const [usernameValue, setUsernameValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    try {
      usernameValidate(usernameValue);
      emailValidate(emailValue);
      passwordValidate(passwordValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return;
    }

    const data = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    };

    axios
      .post("http://localhost:3000/users/signup", data)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error:", error);
      });

    setEmailValue("");
    setUsernameValue("");
    setPasswordValue("");
  };

  const handleChangeEmail = (event) => setEmailValue(event.target.value);
  const handleChangeUsername = (event) => setUsernameValue(event.target.value);
  const handleChangePassword = (event) => setPasswordValue(event.target.value);

  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: "100%",
            maxWidth: 450,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: "left",
              fontWeight: 700,
            }}
          >
            Sign Up
          </Typography>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input
              id="email-input"
              aria-describedby="email-helper-text"
              value={emailValue}
              onChange={handleChangeEmail}
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
              value={usernameValue}
              onChange={handleChangeUsername}
            />
            <FormHelperText id="username-helper-text">
              Create a username
            </FormHelperText>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              autoComplete="new-password"
              slotProps={{ input: { "aria-label": "password-input" } }}
              data-testid="password-input"
              type={showPassword ? "text" : "password"}
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
              aria-describedby="password-helper-text"
              value={passwordValue}
              onChange={handleChangePassword}
            />
            <FormHelperText id="password-helper-text">
              Create a password
            </FormHelperText>
          </FormControl>
          <EmailNotificationCheckbox />
          <TermsCheckbox />
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              my: 2,
            }}
          >
            Sign Up
          </Button>
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              component="p"
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              Already have an account?
            </Typography>
            <Button variant="text" href="/login">
              Log In
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default SignUp;
