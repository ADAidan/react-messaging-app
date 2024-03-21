import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import SearchBar from '../components/SearchBar';
import ContactCard from '../components/ContactCard';
import { UserContext } from '../Context';

const Contacts = () => {
  const user = React.useContext(UserContext);

  return (
    <Container maxWidth='md'>
      <Stack direction='column' spacing={2}>
        <Toolbar/>
        <SearchBar />
        <Divider />
        <Stack direction='column' spacing={0}>
          {user.contacts && user.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Contacts