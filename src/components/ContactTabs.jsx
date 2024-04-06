import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function ContactTabs({ setSelectedTab }) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setSelectedTab(value);
  }, [value]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480, md: "100%" },
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="contact tabs"
      >
        <Tab label="Online" aria-label="Online contacts" />
        <Tab label="All" aria-label="All contacts" />
        <Tab label="Add" aria-label="Add contact" />
      </Tabs>
    </Box>
  );
}

ContactTabs.propTypes = {
  setSelectedTab: PropTypes.func.isRequired,
};
