import * as React from "react";
import { render } from "@testing-library/react";
import Appbar from "../components/Appbar";

test("renders Appbar component", () => {
  const AppbarComponent = render(<Appbar />);
  expect(AppbarComponent).toMatchSnapshot();
});
