import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import SearchBar from '../components/SearchBar';
import Divider from '@mui/material/Divider';

const Contacts = () => {
  return (
    <Container maxWidth='md'>
      <Stack direction='column' spacing={2}>
        <Toolbar/>
        <SearchBar />
        <Divider />
      </Stack>
    </Container>
  );
};

export default Contacts