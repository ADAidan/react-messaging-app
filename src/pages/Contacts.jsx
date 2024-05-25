import * as React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ContactTabs from "../components/ContactTabs";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";

function Contacts() {
  const [userContacts, setUserContacts] = React.useState([]);
  const [userPending, setUserPending] = React.useState([]);
  const [filteredContacts, setFilteredContacts] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchedContacts, setSearchedContacts] = React.useState([]);
  const [selectedTab, setSelectedTab] = React.useState(0);

  // get user contacts
  React.useEffect(() => {
    const getContactData = async () => {
      try {
        const userID = sessionStorage.getItem("user");
        const response = await axios.get(
          `http://localhost:3000/users/${userID}/contacts`,
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

  // get user pending contacts
  React.useEffect(() => {
    const getPendingData = async () => {
      const pendingContacts = [];
      try {
        const userID = sessionStorage.getItem("user");
        const response = await axios.get(
          `http://localhost:3000/users/${userID}/pending`,
        );
        const pendingData = response.data;
        for (let i = 0; i < pendingData.length; i += 1) {
          pendingContacts.push(pendingData[i].user);
          pendingContacts[i].status =
            `${pendingData[i].pendingStatus} contact request`;
        }
        setUserPending(pendingContacts);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Axios Error:", error);
      }
    };
    getPendingData();
  }, []);

  React.useEffect(() => {
    if (!userContacts) return;
    userContacts.sort((a, b) => a.username.localeCompare(b.username));

    switch (selectedTab) {
      // Online tab selected
      case 0:
        setFilteredContacts(
          userContacts.filter((contact) => contact.status === "Online"),
        );
        break;
      // All tab selected
      case 1:
        setFilteredContacts(userContacts);
        break;
      // Pending tab selected
      case 2:
        setFilteredContacts(userPending);
        break;
      default:
        setFilteredContacts([]);
    }
  }, [userContacts, selectedTab]);

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
