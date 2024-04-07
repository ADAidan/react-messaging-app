import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ContactTabs({ setSelectedTab }) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setSelectedTab(value);
  }, [value]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {};

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480, md: "100%" },
        my: 2,
        bgcolor: "background.paper",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="contact tabs"
        >
          <Tab label="Online" aria-label="Online contacts" />
          <Tab label="All" aria-label="All contacts" />
          <Tab label="Pending" aria-label="Pending contacts" />
        </Tabs>
        <Button variant="contained" color="success" onClick={handleClick}>
          Add Contact
        </Button>
      </Stack>
    </Box>
  );
}

ContactTabs.propTypes = {
  setSelectedTab: PropTypes.func.isRequired,
};
