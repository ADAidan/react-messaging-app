import * as React from "react";
import { render, screen } from "@testing-library/react";
import ContactCard from "../components/ContactCard";

test("renders ContactCard component", () => {
  const contact = {
    _id: "1",
    username: "John Doe",
    status: "Online",
  };

  render(<ContactCard contact={contact} />);
  const nameElement = screen.getByText(contact.username);
  expect(nameElement).toBeInTheDocument();
});
