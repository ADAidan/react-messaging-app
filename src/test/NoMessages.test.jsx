import * as React from "react";
import { render } from "@testing-library/react";
import NoMessages from "../components/NoMessages";

test("renders NoMessages component", () => {
  const NoMessagesComponent = render(<NoMessages />);
  expect(NoMessagesComponent).toMatchSnapshot();
});
