/* eslint-disable no-underscore-dangle */
import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import UserCard from "./UserCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  width: "50%",
  maxHeight: 600,
  height: "75%",
  backgroundColor: "#fff",
  border: "2px solid #000",
  borderRadius: 8,
  boxShadow: 24,
  padding: 8,
};

export default function ContactTabs({ setSelectedTab }) {
  const userId = sessionStorage.getItem("user"); // The ID of the user to update
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [allUsers, setAllUsers] = React.useState([]); // The list of all users
  const [displayedUsers, setDisplayedUsers] = React.useState([]); // The list of users to display

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
        if (user._id === userId) {
          return false;
        }

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
      allUsersData.sort((a, b) => a.username.localeCompare(b.username));

      setAllUsers(allUsersData);
    } catch (error) {
      throw new Error("Error fetching users:", error);
    }
  };

  React.useEffect(() => {
    setSelectedTab(value);
  }, [value]);

  React.useEffect(() => {
    if (!searchValue && allUsers) {
      setDisplayedUsers(allUsers);
      return;
    }
    if (searchValue) {
      const displayedsearchedContacts = allUsers.filter((contact) =>
        contact.username.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setDisplayedUsers(displayedsearchedContacts);
    }
  }, [searchValue, allUsers]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOpen = () => {
    fetchAllUsers();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="add-contact-modal"
          aria-describedby="add-contact-form"
        >
          <Stack style={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a contact
            </Typography>
            <SearchBar
              searchValue={searchValue}
              handleSearchChange={handleSearchChange}
            />
            <Stack sx={{ overflow: "auto" }}>
              {displayedUsers.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </Stack>
          </Stack>
        </Modal>
      </Stack>
    </Box>
  );
}

ContactTabs.propTypes = {
  setSelectedTab: PropTypes.func.isRequired,
};
