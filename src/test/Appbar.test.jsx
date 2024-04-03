import * as React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import Appbar from "../components/Appbar";

describe("Appbar", () => {
  it("should render the Appbar component", () => {
    const AppbarComponent = render(<Appbar />);
    expect(AppbarComponent).toMatchSnapshot();
  });
  it("should expand the menu when clicking the profile", async () => {
    const renderedComponent = render(<Appbar />);
    const profileButton = await renderedComponent.findByRole("button", {
      name: /Open settings/i,
    });
    await user.click(profileButton);

    const menu = await renderedComponent.findByRole("menu");
    expect(menu).toBeInTheDocument();
  });
});
