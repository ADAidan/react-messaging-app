import * as React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import SignUp, {
  usernameValidate,
  emailValidate,
  passwordValidate,
} from "../pages/SignUp";

describe("SignUp", () => {
  it("should render the Sign Up header", () => {
    const renderedComponent = render(<SignUp />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it("should clear the input fields when the user submits the form", async () => {
    const renderedComponent = render(<SignUp />);

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
      "Username must contain only letters, numbers, and _",
    );
    expect(usernameValidate("testuser")).toBe(true);
  });
  it("should validate the email", () => {
    expect(() => emailValidate("notAValidEmail.com")).toThrowError(
      "Invalid email format",
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
    const renderedComponent = render(<SignUp />);

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
});
