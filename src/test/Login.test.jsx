import * as React from 'react';
import {
  render,
  screen,
  describe,
  expect,
  it,
} from '@testing-library/react';
import Login from '../pages/Login';

describe('Login', () => {
  it('should render the Log in header', () => {
    render(<Login />);
    const headerElement = screen.getByRole('heading', { name: /Log in/i });
    expect(headerElement).toBeInTheDocument();

    const usernameInput = screen.getByLabelText(/Username/i);
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByText(/enter your password/i);
    expect(passwordInput).toBeInTheDocument();

    const logInButton = screen.getByRole('button', { name: /Log in/i });
    expect(logInButton).toBeInTheDocument();

    const rememberUserCheckbox = screen.getByRole('checkbox', { name: /Remember user/i });
    expect(rememberUserCheckbox).toBeInTheDocument();

    const signUpText = screen.getByText(/Don't have an account?/i);
    expect(signUpText).toBeInTheDocument();

    const signUpLink = screen.getByRole('link', { name: /Sign up/i });
    expect(signUpLink).toBeInTheDocument();
  });
});
