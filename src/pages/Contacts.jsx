import * as React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ContactTabs from "../components/ContactTabs";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";
import UserContext from "../Context";

function Contacts() {
  const user = React.useContext(UserContext);
  const [filteredContacts, setFilteredContacts] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchedContacts, setSearchedContacts] = React.useState([]);
  const [selectedTab, setSelectedTab] = React.useState(0);

  React.useEffect(() => {
    user.contacts.sort((a, b) => a.username.localeCompare(b.username));
    switch (selectedTab) {
      // Online tab selected
      case 0:
        setFilteredContacts(
          user.contacts.filter((contact) => contact.status === "Online"),
        );
        break;
      // All tab selected
      case 1:
        setFilteredContacts(user.contacts);
        break;
      // Pending tab selected
      case 2:
        setFilteredContacts(user.pending);
        break;
      default:
        setFilteredContacts([]);
    }
  }, [user.contacts, selectedTab]);

  React.useEffect(() => {
    if (!searchValue && filteredContacts.length > 0) {
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
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Contacts;
