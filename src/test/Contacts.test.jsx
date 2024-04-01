import * as React from "react";
import { render } from "@testing-library/react";
import Contacts from "../pages/Contacts";

test("renders Contacts page", () => {
  const ContactsComponent = render(<Contacts />);
  expect(ContactsComponent).toMatchSnapshot();
});
