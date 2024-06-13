/* eslint-disable no-underscore-dangle */
import * as React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOnlineAmount } from "../features/onlineCounter/onlineCounterSlice";
import { setContactsAmount } from "../features/contactsCounter/contactsCounterSlice";
import { setPendingAmount } from "../features/pendingCounter/pendingCounterSlice";
import socket from "../socket";
import ContactTabs from "../components/ContactTabs";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";

function Contacts() {
  const userId = sessionStorage.getItem("user");
  const [userContacts, setUserContacts] = React.useState([]);
  const [userPending, setUserPending] = React.useState([]);
  const [filteredContacts, setFilteredContacts] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchedContacts, setSearchedContacts] = React.useState([]);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/users/protected", {
        withCredentials: true,
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log("accessed protected route");
      })
      .catch(() => {
        navigate("/logout");
      });
  }, []);

  // Sort pending contacts by status and username
  const sortPendingContacts = (pending) => {
    const pendingContacts = pending;
    const incomingRequests = pendingContacts.filter(
      (user) => user.status === "incoming contact request",
    );
    const outgoingRequests = pendingContacts.filter(
      (user) => user.status === "outgoing contact request",
    );

    if (incomingRequests.length) {
      incomingRequests.sort((a, b) => a.username.localeCompare(b.username));
    }
    if (outgoingRequests.length) {
      outgoingRequests.sort((a, b) => a.username.localeCompare(b.username));
    }
    const pendingRequests = incomingRequests.concat(outgoingRequests);
    return pendingRequests;
  };

  // get user contacts
  React.useEffect(() => {
    if (!userId) return;
    socket.emit("JoinRoom", userId);
    const getContactData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}/contacts`,
        );
        const contactData = response.data;
        setUserContacts(contactData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Axios Error:", error);
      }
    };
    getContactData();
  }, []);

  // Socket event listener for changing user status
  React.useEffect(() => {
    const handleChangeUserStatus = (data) => {
      setUserContacts((prevContacts) => {
        const updatedContacts = prevContacts.map((contact) =>
          contact._id === data.id
            ? { ...contact, status: data.status }
            : contact,
        );
        return updatedContacts;
      });
    };
    socket.on("ChangeUserStatus", handleChangeUserStatus);
    return () => {
      socket.off("ChangeUserStatus", handleChangeUserStatus);
    };
  }, [userContacts]);

  // get user pending contacts
  React.useEffect(() => {
    if (!userId) return;
    const getPendingData = async () => {
      const pendingContacts = [];
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}/pending`,
        );
        const pendingData = response.data;
        for (let i = 0; i < pendingData.length; i += 1) {
          pendingContacts.push(pendingData[i].user);
          pendingContacts[i].status =
            `${pendingData[i].pendingStatus} contact request`;
        }
        const sortedPending = sortPendingContacts(pendingContacts);
        setUserPending(sortedPending);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Axios Error:", error);
      }
    };
    getPendingData();
  }, []);

  // Socket event listener for deleting contact
  React.useEffect(() => {
    const handleDeleteContact = (data) => {
      setUserContacts((prevContacts) => {
        const updatedContacts = prevContacts.filter(
          (contact) => contact._id !== data._id,
        );
        return updatedContacts;
      });
    };
    socket.on("DeleteContact", handleDeleteContact);
    return () => {
      socket.off("DeleteContact", handleDeleteContact);
    };
  }, [userContacts]);

  // Socket event listener for sending contact request
  React.useEffect(() => {
    const handleUpdatePendingContacts = (data) => {
      setUserPending((prevPending) => {
        const updatedPending = prevPending.concat(data);
        return updatedPending;
      });
    };
    socket.on("UpdatePendingContacts", handleUpdatePendingContacts);
    return () => {
      socket.off("UpdatePendingContacts", handleUpdatePendingContacts);
    };
  }, [userPending]);

  // Socket event listener for accepting contact request
  React.useEffect(() => {
    const handleAcceptPendingContacts = (data) => {
      setUserContacts((prevContacts) => {
        const updatedContacts = prevContacts.concat(data);
        return updatedContacts;
      });
      setUserPending((prevPending) => {
        const updatedPending = prevPending.filter(
          (pending) => pending._id !== data._id,
        );
        return updatedPending;
      });
    };
    socket.on("AcceptContactRequest", handleAcceptPendingContacts);
    return () => {
      socket.off("AcceptContactRequest", handleAcceptPendingContacts);
    };
  }, [userContacts, userPending]);

  // Socket event listener for rejecting contact request
  React.useEffect(() => {
    const handleRejectPendingContacts = (data) => {
      setUserPending((prevPending) => {
        const updatedPending = prevPending.filter(
          (pending) => pending._id !== data._id,
        );
        return updatedPending;
      });
    };
    socket.on("RejectContactRequest", handleRejectPendingContacts);
    return () => {
      socket.off("RejectContactRequest", handleRejectPendingContacts);
    };
  }, [userPending]);

  // Filter contacts based on selected tab
  React.useEffect(() => {
    if (!userContacts) return;

    const onlineContacts = userContacts.filter(
      (contact) => contact.status === "Online",
    );

    dispatch(setOnlineAmount(onlineContacts.length));
    dispatch(setContactsAmount(userContacts.length));
    dispatch(setPendingAmount(userPending.length));

    // Sort contacts by username and alphabetically
    userContacts.sort((a, b) => a.username.localeCompare(b.username));

    switch (selectedTab) {
      // Online tab selected
      case 0:
        setFilteredContacts(onlineContacts);
        break;
      // All tab selected
      case 1:
        setFilteredContacts(userContacts);
        break;
      // Pending tab selected
      case 2:
        setFilteredContacts(sortPendingContacts(userPending));
        break;
      default:
        setFilteredContacts([]);
    }
  }, [userContacts, userPending, selectedTab]);

  React.useEffect(() => {
    if (!searchValue && filteredContacts) {
      setSearchedContacts(filteredContacts);
      return;
    }
    if (searchValue) {
      const displayedsearchedContacts = filteredContacts.filter((contact) =>
        contact.username.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setSearchedContacts(displayedsearchedContacts);
    }
  }, [searchValue, filteredContacts]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Container data-testid="contact-page" maxWidth="md">
      <Toolbar />
      <ContactTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Stack direction="column" spacing={2}>
        <SearchBar
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
        />
        <Divider />
        <Stack
          direction="column"
          spacing={0}
          sx={{
            maxHeight: "calc(100vh - 210px)",
            overflowY: "scroll",
          }}
        >
          {searchedContacts.map((contact) => (
            // eslint-disable-next-line no-underscore-dangle
            <ContactCard key={contact._id} contact={contact} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Contacts;
