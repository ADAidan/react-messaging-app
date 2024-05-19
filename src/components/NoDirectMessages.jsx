import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function NoDirectMessages() {
  return (
    <Stack
      test-id="no-direct-messages"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        height: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          mt: 10,
        }}
      >
        No direct messages
      </Typography>
      <Typography variant="h6" component="p">
        Start a conversation by adding a new chat
      </Typography>
    </Stack>
  );
}

export default NoDirectMessages;
