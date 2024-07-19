import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import LoginProvider, { LoginContext } from './context.jsx';
import Auth from './auth.jsx';

describe('Auth Component', () => {
  afterEach(() => {
    cleanup(); // Ensure the DOM is clean after each test
  });

  const renderWithProviders = (ui, contextValue) => {
    return render(
      <MantineProvider>
        <LoginProvider>
          <LoginContext.Provider value={contextValue}>
            {ui}
          </LoginContext.Provider>
        </LoginProvider>
      </MantineProvider>
    );
  };

  it('should render children when logged in and has required capability', () => {
    const contextValue = {
      loggedIn: true,
      can: (capability) => capability === 'read',
    };

    renderWithProviders(
      <Auth capability="read">
        <div data-testid="child">Child Component</div>
      </Auth>,
      contextValue
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should not render children when not logged in', () => {
    const contextValue = {
      loggedIn: false,
      can: (capability) => capability === 'read',
    };

    renderWithProviders(
      <Auth capability="read">
        <div data-testid="child">Child Component</div>
      </Auth>,
      contextValue
    );

    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('should not render children when logged in but lacks required capability', () => {
    const contextValue = {
      loggedIn: true,
      can: (capability) => capability === 'write',
    };

    renderWithProviders(
      <Auth capability="read">
        <div data-testid="child">Child Component</div>
      </Auth>,
      contextValue
    );

    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('should render children when no capability is required and logged in', () => {
    const contextValue = {
      loggedIn: true,
      can: () => false,
    };

    renderWithProviders(
      <Auth>
        <div data-testid="child">Child Component</div>
      </Auth>,
      contextValue
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
