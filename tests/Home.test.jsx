import * as React from "react";
import { render } from "@testing-library/react";
import Home from "../client/pages/Home";

describe("Home", () => {
  it("should render the Welcome to Concord header", () => {
    const HomeComponent = render(<Home />);
    expect(HomeComponent).toMatchSnapshot();
  });
});
