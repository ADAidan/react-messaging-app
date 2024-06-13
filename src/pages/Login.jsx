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
import socket from "../socket";
import RememberUserCheckbox from "../components/RememberUserCheckbox";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [authError, setAuthError] = React.useState(false);
  const [rememberUser, setRememberUser] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (!emailValue || !passwordValue) {
      setAuthError(true);
      return;
    }

    const data = {
      email: emailValue,
      password: passwordValue,
    };

    setEmailValue("");
    setPasswordValue("");

    axios
      .post("http://localhost:3000/users/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        sessionStorage.setItem("user", response.data.id);
        socket.emit("ChangeUserStatus", {
          status: "Online",
          id: response.data.id,
        });
        navigate("/");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error:", error.response);
        setAuthError(true);
      });
  };

  React.useEffect(() => {
    if (rememberUser) {
      // eslint-disable-next-line no-console
      console.log("Remember user");
    }
  }, [rememberUser]);

  const handleForgotPassword = () => {};

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
            Log in
          </Typography>
          <FormControl variant="standard" fullWidth error={authError}>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input
              id="email-input"
              aria-describedby="email-helper-text"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <FormHelperText id="email-helper-text">
              {authError ? "Invalid email or password" : "Enter your email"}
            </FormHelperText>
          </FormControl>
          <FormControl variant="standard" fullWidth error={authError}>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              slotProps={{ input: { "aria-label": "password-input" } }}
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
            />
            <FormHelperText id="password-helper-text">
              {authError ? "Invalid email or password" : "Enter your password"}
            </FormHelperText>
          </FormControl>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <RememberUserCheckbox setRememberUser={setRememberUser} />
            <Button variant="text" onClick={handleForgotPassword}>
              Forgot password?
            </Button>
          </Stack>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              my: 2,
            }}
          >
            Log In
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
              Don&apos;t have an account?
            </Typography>
            <Button variant="text" href="/signup">
              Sign Up
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default Login;
