import * as React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../pages/Profile";

describe("Profile", () => {
  it("should render the Account header", () => {
    render(<Profile />);
    const headerElement = screen.getByRole("heading", { name: /Account/i });
    expect(headerElement).toBeInTheDocument();

    const usernameInput = screen.getByRole("textbox", { name: /Username/i });
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    const editPasswordButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(editPasswordButton).toBeInTheDocument();
  });
});
