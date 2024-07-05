import React from "react";
import Box from "@mui/material/Box";

function Background() {
  return (
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
  );
}

export default Background;
