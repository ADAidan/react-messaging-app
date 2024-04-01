import * as React from "react";
import { render } from "@testing-library/react";
import MessageInput from "../components/MessageInput";

test("should render correctly", () => {
  const { container } = render(<MessageInput />);
  expect(container).toMatchSnapshot();
});
