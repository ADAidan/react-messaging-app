import * as React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Copyright from "../Copyright";

function Home() {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundImage: "url(../../images/homepage-background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.35)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
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
