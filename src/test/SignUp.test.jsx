import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import SignUp, {
  usernameValidate,
  emailValidate,
  passwordValidate,
} from "../pages/SignUp";

describe("SignUp", () => {
  it("should render the Sign Up header", () => {
    const renderedComponent = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it("should clear the input fields when the user submits the form", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    const emailInput = await renderedComponent.findByRole("textbox", {
      name: /Email/i,
    });
    await user.type(emailInput, "test@test.com");
    expect(emailInput).toHaveValue("test@test.com");

    const usernameInput = await renderedComponent.findByRole("textbox", {
      name: /Username/i,
    });
    await user.type(usernameInput, "testuser");
    expect(usernameInput).toHaveValue("testuser");

    const passwordInput =
      await renderedComponent.findByLabelText(/password-input/i);
    await user.type(passwordInput, "password");
    expect(passwordInput).toHaveValue("password");

    const signUpButton = await renderedComponent.findByRole("button", {
      name: /Sign Up/i,
    });

    const termsAndConditionsCheckbox = await renderedComponent.findByLabelText(
      /agree to terms of service/i,
    );
    await user.click(termsAndConditionsCheckbox);
    await user.click(signUpButton);

    expect(emailInput).toHaveValue("");
    expect(usernameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });
  it("should validate the username", () => {
    expect(() => usernameValidate("a")).toThrowError(
      "Username must be at least 2 characters",
    );
    expect(() => usernameValidate("a".repeat(21))).toThrowError(
      "Username must be less than 20 characters",
    );
    expect(() => usernameValidate("a!")).toThrowError(
      "Username must contain only letters, numbers, spaces, _ and -",
    );
    expect(usernameValidate("testuser")).toBe(true);
  });
  it("should validate the email", () => {
    expect(() => emailValidate("notAValidEmail.com")).toThrowError(
      "Please enter a valid email address",
    );
    expect(() => emailValidate(`${"a".repeat(51)}@testing.com`)).toThrowError(
      "Email must be less than 50 characters",
    );
    expect(emailValidate("testuser@testing.com")).toBe(true);
  });
  it("should validate the password", () => {
    expect(() => passwordValidate("a")).toThrowError(
      "Password must be at least 8 characters",
    );
    expect(() => passwordValidate("a".repeat(21))).toThrowError(
      "Password must be less than 20 characters",
    );
    expect(passwordValidate("password")).toBe(true);
  });
  it("should toggle show password when the user clicks the show password button", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    const passwordInput =
      await renderedComponent.findByLabelText(/password-input/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    const showPasswordButton = await renderedComponent.findByLabelText(
      /toggle password visibility/i,
    );
    await user.click(showPasswordButton);

    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(showPasswordButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
  it("should check the receive email notifications checkbox", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    const receiveEmailNotificationsCheckbox =
      await renderedComponent.findByLabelText(/receive email notifications/i);
    expect(receiveEmailNotificationsCheckbox).toBeChecked();

    await user.click(receiveEmailNotificationsCheckbox);
    expect(receiveEmailNotificationsCheckbox).not.toBeChecked();
  });
  it("should check the terms and conditions checkbox", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    const termsAndConditionsCheckbox = await renderedComponent.findByLabelText(
      /agree to terms of service/i,
    );
    expect(termsAndConditionsCheckbox).not.toBeChecked();

    await user.click(termsAndConditionsCheckbox);
    expect(termsAndConditionsCheckbox).toBeChecked();
  });
});
