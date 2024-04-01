import * as React from "react";
import { render } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

test("renders SearchBar component", () => {
  const SearchBarComponent = render(<SearchBar />);
  expect(SearchBarComponent).toMatchSnapshot();
});
