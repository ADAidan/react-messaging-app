/* eslint-disable no-underscore-dangle */
import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddModal from "./AddModal";

export default function ContactTabs({ setSelectedTab }) {
  const userId = sessionStorage.getItem("user"); // The ID of the user to update
  const [value, setValue] = React.useState(0);
  const [allUsers, setAllUsers] = React.useState([]); // The list of all users
  const [open, setOpen] = React.useState(false);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/list");

      if (!response) {
        throw new Error("Failed to fetch users");
      }

      const userData = await axios.get(`http://localhost:3000/users/${userId}`);

      if (!userData) {
        throw new Error("Failed to fetch user");
      }

      // Sorts the users by username and filters out the current user, contacts, and pending requests
      const allUsersData = response.data.filter((user) => {
        // if user is the current user, return false
        if (user._id === userId) {
          return false;
        }

        // if user is already a contact or a pending contact, return false
        const isContact = userData.data.contacts.some(
          (contactId) => contactId === user._id,
        );
        if (isContact) {
          return false;
        }

        const isPending = userData.data.pending.some(
          (pending) => pending.user === user._id,
        );
        if (isPending) {
          return false;
        }

        return true;
      });
      // Sorts the users by username alphabetically
      allUsersData.sort((a, b) => a.username.localeCompare(b.username));

      setAllUsers(allUsersData);
    } catch (error) {
      throw new Error("Error fetching users:", error);
    }
  };

  React.useEffect(() => {
    setSelectedTab(value);
  }, [value]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    fetchAllUsers();
    setOpen(true);
  };

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
        <Button variant="contained" color="success" onClick={handleOpen}>
          Add Contact
        </Button>
        <AddModal open={open} setOpen={setOpen} allUsers={allUsers} />
      </Stack>
    </Box>
  );
}

ContactTabs.propTypes = {
  setSelectedTab: PropTypes.func.isRequired,
};
