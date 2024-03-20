import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import SearchBar from '../components/SearchBar';
import ContactCard from '../components/ContactCard';

const Contacts = () => {
  return (
    <Container maxWidth='md'>
      <Stack direction='column' spacing={2}>
        <Toolbar/>
        <SearchBar />
        <Divider />
        <Stack direction='column' spacing={0}>
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Contacts