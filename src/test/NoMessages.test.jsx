import * as React from "react";
import { render, screen, test, expect } from "@testing-library/react";
import NoMessages from "../components/NoMessages";

test("renders NoMessages component", () => {
  render(<NoMessages />);
  const titleElement = screen.getByRole("heading");
  expect(titleElement).toBeInTheDocument();
});
