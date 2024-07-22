import { useContext } from 'react';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import LoginProvider, { LoginContext } from './context.jsx';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

// Helper component to consume the context
const ConsumerComponent = () => {
  const { loggedIn, can, login, logout } = useContext(LoginContext);
  return (
    <div>
      <div data-testid="loggedIn">{loggedIn ? 'true' : 'false'}</div>
      <button data-testid="login-button" onClick={() => login('admin', 'ADMIN')}>Login</button>
      <button data-testid="logout-button" onClick={logout}>Logout</button>
      <div data-testid="can-create">{can('create') ? 'yes' : 'no'}</div>
    </div>
  );
};

describe('LoginProvider', () => {
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

  const renderWithProvider = (ui) => {
    return render(<LoginProvider>{ui}</LoginProvider>);
  };

  it('should provide initial state', () => {
    renderWithProvider(<ConsumerComponent />);
    expect(screen.getByTestId('loggedIn').textContent).toBe('false');
    expect(screen.getByTestId('can-create').textContent).toBe('no');
  });

  it('should login user and update state', async () => {
    renderWithProvider(<ConsumerComponent />);
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for the state to update
    await waitFor(() => {
      expect(screen.getByTestId('loggedIn').textContent).toBe('true');
      expect(screen.getByTestId('can-create').textContent).toBe('yes');
    });
  });

  it('should logout user and reset state', async () => {
    renderWithProvider(<ConsumerComponent />);
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for the state to update
    await waitFor(() => {
      expect(screen.getByTestId('loggedIn').textContent).toBe('true');
    });

    fireEvent.click(screen.getByTestId('logout-button'));

    // Wait for the state to reset
    await waitFor(() => {
      expect(screen.getByTestId('loggedIn').textContent).toBe('false');
      expect(screen.getByTestId('can-create').textContent).toBe('no');
    });
  });
});
