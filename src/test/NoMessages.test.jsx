import { render, screen } from '@testing-library/react';
import NoMessages from '../components/NoMessages';

test('renders component', () => {
  render(<NoMessages />);
  const titleElement = screen.getByRole('heading');
  expect(titleElement).toBeInTheDocument();
})