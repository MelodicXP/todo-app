import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import LoginProvider from './context.jsx'; // Import LoginProvider
import Login from './login.jsx'; // Import the Login component

describe('Login Component', () => {
  afterEach(() => {
    cleanup(); // Ensure the DOM is clean after each test
  });

  const renderWithProviders = (ui) => {
    return render(
      <MantineProvider>
        <LoginProvider>{ui}</LoginProvider>
      </MantineProvider>
    );
  };

  it('should display login form initially', () => {
    renderWithProviders(<Login />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('username-login')).toBeInTheDocument();
    expect(screen.getByTestId('password-login')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('should log in user and display logout button', async () => {
    renderWithProviders(<Login />);
    
    // Input user credentials
    fireEvent.change(screen.getByTestId('username-login'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByTestId('password-login'), { target: { value: 'ADMIN' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for the state to update
    await screen.findByTestId('logout-button');

    // Assert logout button is displayed
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();

    // Click logout button
    fireEvent.click(screen.getByTestId('logout-button'));
  });

  it('should log out user and display login form again', async () => {
    renderWithProviders(<Login />);

    // Input user credentials
    fireEvent.change(screen.getByTestId('username-login'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByTestId('password-login'), { target: { value: 'ADMIN' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for the state to update
    await screen.findByTestId('logout-button');

    // Click logout button
    fireEvent.click(screen.getByTestId('logout-button'));

    // Wait for the login form to reappear
    await screen.findByTestId('login-form');

    // Assert login form is displayed again
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('username-login')).toBeInTheDocument();
    expect(screen.getByTestId('password-login')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();
  });
});
