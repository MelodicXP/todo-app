import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useContext } from 'react';
import DisplaySettingsProvider, { SettingsContext } from './index';

describe('DisplaySettingsProvider', () => {
  afterEach(() => {
    cleanup(); // Ensure the DOM is clean after each test
  });

  // A simple component that consumes the context values
  const TestComponent = () => {
    const { displayItems, hideCompleted, setHideCompleted } = useContext(SettingsContext);
    return (
      <div>
        <div data-testid="display-items">{displayItems}</div>
        <div data-testid="hide-completed">{hideCompleted.toString()}</div>
        <button data-testid="toggle-hide-completed" onClick={() => setHideCompleted(prev => !prev)}>
          Toggle Hide Completed
        </button>
      </div>
    );
  };

  it('should provide default settings', () => {
    render(
      <DisplaySettingsProvider>
        <TestComponent />
      </DisplaySettingsProvider>
    );

    const displayItems = screen.getByTestId('display-items');
    const hideCompleted = screen.getByTestId('hide-completed');

    // Assert default values
    expect(displayItems.textContent).toBe('3');
    expect(hideCompleted.textContent).toBe('true');
  });

  it('should allow updating hideCompleted', () => {
    render(
      <DisplaySettingsProvider>
        <TestComponent />
      </DisplaySettingsProvider>
    );

    const hideCompleted = screen.getByTestId('hide-completed');
    const toggleButton = screen.getByTestId('toggle-hide-completed');

    // Assert default value
    expect(hideCompleted.textContent).toBe('true');

    // Toggle hideCompleted value
    fireEvent.click(toggleButton);

    // Assert updated value
    expect(hideCompleted.textContent).toBe('false');
  });
});
