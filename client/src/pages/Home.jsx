import * as React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Background from "../components/Background";
import Copyright from "../Copyright";

function Home() {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
      }}
    >
      <Background />
      <Stack
        direction="column"
        spacing={2}
        sx={{
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "#000",
          }}
        >
          Welcome to Concord
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "#000",
          }}
        >
          Connect with old friends or meet new ones. Create or join a thriving
          community.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
          }}
        >
          <Button variant="contained" href="/signup">
            join for free
          </Button>
          <Button variant="contained" href="/messages">
            messages
          </Button>
        </Stack>
        <Copyright />
      </Stack>
    </Container>
  );
}

export default Home;
