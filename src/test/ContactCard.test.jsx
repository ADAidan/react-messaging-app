import * as React from 'react';
import {
  render,
  screen,
  test,
  expect,
} from '@testing-library/react';
import ContactCard from '../components/ContactCard';

test('renders ContactCard component', () => {
  const contact = {
    id: 1,
    username: 'John Doe',
  };

  render(<ContactCard contact={contact} />);
  const nameElement = screen.getByText(contact.username);
  expect(nameElement).toBeInTheDocument();
});
