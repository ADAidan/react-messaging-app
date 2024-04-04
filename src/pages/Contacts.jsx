import * as React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";
import UserContext from "../Context";

function Contacts() {
  const user = React.useContext(UserContext);
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredContacts, setFilteredContacts] = React.useState([]);

  React.useEffect(() => {
    if (!searchValue && user.contacts) {
      setFilteredContacts(user.contacts);
      return;
    }
    if (searchValue) {
      const displayedFilteredContacts = user.contacts.filter((contact) =>
        contact.username.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredContacts(displayedFilteredContacts);
    }
  }, [searchValue]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Container data-testid="contact-page" maxWidth="md">
      <Stack direction="column" spacing={2}>
        <Toolbar />
        <SearchBar
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
        />
        <Divider />
        <Stack direction="column" spacing={0}>
          {user.contacts &&
            filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Contacts;
