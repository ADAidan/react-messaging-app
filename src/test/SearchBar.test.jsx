import { render, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('renders SearchBar component', () => {
  render(<SearchBar />);
  const searchBar = screen.getByTestId('search-bar');
  expect(searchBar).toBeInTheDocument();
});