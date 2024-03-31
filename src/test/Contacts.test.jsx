import * as React from "react";
import { render, screen } from "@testing-library/react";
import Contacts from "../pages/Contacts";

test("renders Contacts page", () => {
  render(<Contacts />);
  const contactPage = screen.getByTestId("contact-page");
  expect(contactPage).toBeInTheDocument();
});
