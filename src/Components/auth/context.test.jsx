import { useContext } from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import LoginProvider, { LoginContext } from './context.jsx';

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
  beforeEach(() => {
    cleanup();
  });

  const renderWithProvider = (ui) => {
    return render(<LoginProvider>{ui}</LoginProvider>);
  };

  it('should provide initial state', () => {
    renderWithProvider(<ConsumerComponent />);
    expect(screen.getByTestId('loggedIn').textContent).toBe('false');
  });

  it('should login user and update state', async () => {
    renderWithProvider(<ConsumerComponent />);
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for the state to update
    await screen.findByText('true');

    expect(screen.getByTestId('loggedIn').textContent).toBe('true');
  });

  it('should logout user and reset state', async () => {
    renderWithProvider(<ConsumerComponent />);
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for the state to update
    await screen.findByText('true');

    fireEvent.click(screen.getByTestId('logout-button'));
    expect(screen.getByTestId('loggedIn').textContent).toBe('false');
  });

});
