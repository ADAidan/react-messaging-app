import { render, screen } from '@testing-library/react';
import Appbar from '../components/Appbar';

test('renders Appbar component', () => {
  render(<Appbar />);
  const appBar = screen.getByTestId('app-bar');
  expect(appBar).toBeInTheDocument();
});