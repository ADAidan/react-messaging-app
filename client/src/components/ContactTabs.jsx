/* eslint-disable no-underscore-dangle */
import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import AddContactModal from "./AddContactModal";

export default function ContactTabs({ setSelectedTab }) {
  const userId = useSelector((state) => state.userData.user.id);
  const [value, setValue] = React.useState(0);
  const [allUsers, setAllUsers] = React.useState([]); // The list of all users
  const [open, setOpen] = React.useState(false);

  const onlineCounter = useSelector((state) => state.onlineCounter.value);
  const contactsCounter = useSelector((state) => state.contactsCounter.value);
  const pendingCounter = useSelector((state) => state.pendingCounter.value);
  const blockedCounter = useSelector((state) => state.blockedCounter.value);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/list`,
      );

      if (!response) {
        throw new Error("Failed to fetch users");
      }

      const userData = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
      );

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
          <Tab label={`Online ${onlineCounter}`} aria-label="Online contacts" />
          <Tab label={`All ${contactsCounter}`} aria-label="All contacts" />
          <Tab
            label={`Pending ${pendingCounter}`}
            aria-label="Pending contacts"
          />
          <Tab
            label={`Blocked ${blockedCounter}`}
            aria-label="Blocked contacts"
          />
        </Tabs>
        <Button variant="contained" color="success" onClick={handleOpen}>
          Add Contact
        </Button>
        <AddContactModal open={open} setOpen={setOpen} allUsers={allUsers} />
      </Stack>
    </Box>
  );
}

ContactTabs.propTypes = {
  setSelectedTab: PropTypes.func.isRequired,
};
