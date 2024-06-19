import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import Login from "../client/pages/Login";

describe("Login", () => {
  it("should render the Log in Component", () => {
    const renderedComponent = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it("should clear the input fields when the user submits the form", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = await renderedComponent.findByRole("textbox", {
      name: /Email/i,
    });
    await user.type(emailInput, "testuser@testing.com");
    expect(emailInput).toHaveValue("testuser@testing.com");

    const passwordInput = await renderedComponent.findByLabelText(
      /password-input/i
    );
    await user.type(passwordInput, "password");
    expect(passwordInput).toHaveValue("password");

    const loginButton = await renderedComponent.findByRole("button", {
      name: /Log in/i,
    });
    await user.click(loginButton);

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });
  it("should check the Remember me checkbox", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const rememberMeCheckbox = await renderedComponent.findByLabelText(
      /Remember me/i
    );
    expect(rememberMeCheckbox).not.toBeChecked();

    await user.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();
  });
});
