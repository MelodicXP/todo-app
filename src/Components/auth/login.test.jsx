import { describe, expect, it, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import LoginProvider from './context.jsx'; // Import LoginProvider
import Login from './login.jsx'; // Import the Login component
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

describe('Login Component', () => {
  afterEach(() => {
    cleanup(); // Ensure the DOM is clean after each test
    mock.resetHistory(); // Reset mock history to ensure no leftover calls
    localStorage.clear(); // Clear localStorage after each test
  });

  beforeEach(() => {
    // Mock the login endpoint
    mock.onPost(`${import.meta.env.VITE_API}/auth/signin`).reply(200, {
      user: {
        token: 'fake-token',
        capabilities: ['create', 'read', 'update', 'delete'],
        id: 1,
        username: 'admin',
        password: '$2b$10$zl7zzcCgaheeYG.IqtX2EeRODqARsqE4agp9ZyC3MRXnH6sIpHpyK',
        role: 'admin',
        createdAt: '2024-06-12T16:00:08.615Z',
        updatedAt: '2024-06-12T16:00:08.615Z'
      },
      token: 'fake-token'
    });
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

    // Wait for the login form to reappear
    await screen.findByTestId('login-form');

    // Assert login form is displayed again
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('username-login')).toBeInTheDocument();
    expect(screen.getByTestId('password-login')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();
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
