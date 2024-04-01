import * as React from "react";
import { render } from "@testing-library/react";
import Profile from "../pages/Profile";

describe("Profile", () => {
  it("should render the Account header", () => {
    const ProfileComponent = render(<Profile />);
    expect(ProfileComponent).toMatchSnapshot();
  });
});
