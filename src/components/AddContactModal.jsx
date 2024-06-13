import * as React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import socket from "../socket";
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

function AddContactModal({ open, setOpen, allUsers }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [displayedUsers, setDisplayedUsers] = React.useState([]);

  // Socket event listener for removing the user from the add contact modal
  React.useEffect(() => {
    socket.on("UpdatePendingContacts", (newPending) => {
      // Removes the user from the displayedUsers array
      setDisplayedUsers((prev) =>
        // eslint-disable-next-line no-underscore-dangle
        prev.filter((user) => user._id !== newPending._id),
      );
    });
  }, [allUsers]);

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

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
            // eslint-disable-next-line no-underscore-dangle
            <UserCard key={user._id} user={user} />
          ))}
        </Stack>
      </Stack>
    </Modal>
  );
}

AddContactModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AddContactModal;
