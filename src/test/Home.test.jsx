import * as React from 'react';
import {
  render,
  screen,
  describe,
  expect,
  it,
} from '@testing-library/react';
import Home from '../pages/Home';

describe('Home', () => {
  it('should render the Welcome to Concord header', () => {
    render(<Home />);
    const headerElement = screen.getByRole('heading', { name: /Welcome to Concord/i });
    expect(headerElement).toBeInTheDocument();

    const joinForFreeButton = screen.getByRole('link', { name: /join for free/i });
    expect(joinForFreeButton).toBeInTheDocument();

    const messagesButton = screen.getByRole('link', { name: /messages/i });
    expect(messagesButton).toBeInTheDocument();

    const connectWithOldFriendsText = screen.getByText(/Connect with old friends or meet new ones/i);
    expect(connectWithOldFriendsText).toBeInTheDocument();

    const createOrJoinCommunityText = screen.getByText(/Create or join a thriving community/i);
    expect(createOrJoinCommunityText).toBeInTheDocument();

    const footerText = screen.getByText(/Copyright © 2024/i);
    expect(footerText).toBeInTheDocument();
  });
});
