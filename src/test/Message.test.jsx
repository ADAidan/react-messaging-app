import * as React from 'react';
import {
  render,
  screen,
  test,
  expect,
} from '@testing-library/react';
import Message from '../components/Message';

test('renders Messages component', () => {
  const message = {
    id: 1,
    author: 'John Doe',
    text: 'Hello, World!',
    time: '10:00 AM',
  };

  render(<Message message={message} />);
  const authorElement = screen.getByText(message.author);
  const messageElement = screen.getByText(message.text);
  const timeElement = screen.getByText(message.time);
  expect(authorElement).toBeInTheDocument();
  expect(messageElement).toBeInTheDocument();
  expect(timeElement).toBeInTheDocument();
});
