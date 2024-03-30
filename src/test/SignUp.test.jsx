import { render, screen } from '@testing-library/react';
import SignUp from '../pages/SignUp';

describe('SignUp', () => {
  it('should render the Sign Up header', () => {
    render(<SignUp />);
    const headerElement = screen.getByRole('heading', { name: /Sign Up/i })
    expect(headerElement).toBeInTheDocument();

    const emailInput = screen.getByText(/enter your email/i);
    expect(emailInput).toBeInTheDocument();

    const usernameInput = screen.getByLabelText(/Username/i);
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByText(/create a password/i);
    expect(passwordInput).toBeInTheDocument();

    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    expect(signUpButton).toBeInTheDocument();

    const signInText = screen.getByText(/Already have an account?/i);
    expect(signInText).toBeInTheDocument();

    const signInLink = screen.getByRole('link', { name: /Log In/i });
    expect(signInLink).toBeInTheDocument();
  });
});