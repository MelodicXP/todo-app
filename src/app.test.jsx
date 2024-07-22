import { describe, expect, it, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import App from './App.jsx';
import LoginProvider from './Components/auth/context.jsx'; // Import LoginProvider
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

describe('App', () => {
  afterEach(() => {
    cleanup(); // Ensure the DOM is clean after each test
    localStorage.clear(); // Clear localStorage after each test
    mock.resetHistory(); // Reset mock history to ensure no leftover calls
  });

  const renderWithProviders = (ui, options) => {
    return render(<LoginProvider>{ui}</LoginProvider>, options);
  };

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

    // Mock the get items endpoint to return an empty list initially
    mock.onGet(`${import.meta.env.VITE_API}/api/v1/todo`).reply(200, []);

    // Mock the add item endpoint
    mock.onPost(`${import.meta.env.VITE_API}/api/v1/todo`).reply((config) => {
      const newItem = JSON.parse(config.data);
      return [
        200,
        {
          ...newItem,
          id: '2',
        },
      ];
    });

    // Mock the delete item endpoint
    mock.onDelete(`${import.meta.env.VITE_API}/api/v1/todo/2`).reply(200);
  });

  it('should login and logout user', async () => {
    renderWithProviders(<App />);

    // Assert login form fields render
    const loginForm = screen.getByTestId('login-form');
    const userNameLogin = screen.getByTestId('username-login');
    const passwordLogin = screen.getByTestId('password-login');
    const loginButton = screen.getByTestId('login-button');

    // Assert login form appears on initial render
    expect(loginForm).toBeInTheDocument();
    expect(userNameLogin).toBeInTheDocument();
    expect(passwordLogin).toBeInTheDocument();

    // Mock user login credentials
    let mockUserName = 'admin';
    let mockPassword = 'ADMIN';

    // Input values in login form
    fireEvent.change(userNameLogin, { target: { value: mockUserName } });
    fireEvent.change(passwordLogin, { target: { value: mockPassword } });

    // Assert that the input values are updated correctly
    expect(userNameLogin.value).toBe(mockUserName);
    expect(passwordLogin.value).toBe(mockPassword);

    // Fire login button
    fireEvent.click(loginButton);

    // Assert logout button appears
    let logoutButton = await screen.findByTestId('logout-button');
    expect(logoutButton).toBeInTheDocument();

    // Fire logout button
    fireEvent.click(logoutButton);

    // Re-query the DOM for the login form fields after logging out
    const loginFormAfterLogout = await screen.findByTestId('login-form');
    const userNameLoginAfterLogout = screen.getByTestId('username-login');
    const passwordLoginAfterLogout = screen.getByTestId('password-login');

    // Assert login form reappears after logging out
    expect(loginFormAfterLogout).toBeInTheDocument();
    expect(userNameLoginAfterLogout).toBeInTheDocument();
    expect(passwordLoginAfterLogout).toBeInTheDocument();
  });

  it('should login admin user and add item', async () => {
    renderWithProviders(<App />);

    // Assert login form fields render
    const loginForm = screen.getByTestId('login-form');
    const userNameLogin = screen.getByTestId('username-login');
    const passwordLogin = screen.getByTestId('password-login');
    const loginButton = screen.getByTestId('login-button');

    // Assert login form appears on initial render
    expect(loginForm).toBeInTheDocument();
    expect(userNameLogin).toBeInTheDocument();
    expect(passwordLogin).toBeInTheDocument();

    // Mock user login credentials
    let mockUserName = 'admin';
    let mockPassword = 'ADMIN';

    // Input values in login form
    fireEvent.change(userNameLogin, { target: { value: mockUserName } });
    fireEvent.change(passwordLogin, { target: { value: mockPassword } });

    // Assert that the input values are updated correctly
    expect(userNameLogin.value).toBe(mockUserName);
    expect(passwordLogin.value).toBe(mockPassword);

    // Fire login button
    fireEvent.click(loginButton);

    // Assert logout button appears
    let logoutButton = await screen.findByTestId('logout-button');
    expect(logoutButton).toBeInTheDocument();

    // Add items
    // Assert input user form renders
    const itemDetailsInput = screen.getByTestId('item-details-input');
    const assignedToInput = screen.getByTestId('assigned-to-input');
    const addItemButton = screen.getByTestId('add-item-button');

    // Mock user inputs
    let mockTask = 'Task 1';
    let mockAssignedTo = 'Person 1';

    // Input values
    fireEvent.change(itemDetailsInput, { target: { value: mockTask } });
    fireEvent.change(assignedToInput, { target: { value: mockAssignedTo } });

    // Assert that the input values are updated correctly
    expect(itemDetailsInput.value).toBe(mockTask);
    expect(assignedToInput.value).toBe(mockAssignedTo);

    // Fire add item button
    fireEvent.click(addItemButton);

    // Assert added list item appears on screen
    let listItems = await screen.findAllByTestId('list-item'); // Get all items
    expect(listItems.length).toBeGreaterThan(0); // Ensure at least one item is present

    let completeCheckbox = screen.getAllByTestId('complete-checkbox')[0];

    // Assert the checkbox is not checked initially
    expect(completeCheckbox).not.toBeChecked();

    // Fire logout button
    fireEvent.click(logoutButton);

    // Re-query the DOM for the login form fields after logging out
    const loginFormAfterLogout = await screen.findByTestId('login-form');
    const userNameLoginAfterLogout = screen.getByTestId('username-login');
    const passwordLoginAfterLogout = screen.getByTestId('password-login');

    // Assert login form reappears after logging out
    expect(loginFormAfterLogout).toBeInTheDocument();
    expect(userNameLoginAfterLogout).toBeInTheDocument();
    expect(passwordLoginAfterLogout).toBeInTheDocument();
  });

  it('should login admin user and delete item', async () => {
    renderWithProviders(<App />);

    // Assert login form fields render
    const loginForm = screen.getByTestId('login-form');
    const userNameLogin = screen.getByTestId('username-login');
    const passwordLogin = screen.getByTestId('password-login');
    const loginButton = screen.getByTestId('login-button');

    // Assert login form appears on initial render
    expect(loginForm).toBeInTheDocument();
    expect(userNameLogin).toBeInTheDocument();
    expect(passwordLogin).toBeInTheDocument();

    // Mock user login credentials
    let mockUserName = 'admin';
    let mockPassword = 'ADMIN';

    // Input values in login form
    fireEvent.change(userNameLogin, { target: { value: mockUserName } });
    fireEvent.change(passwordLogin, { target: { value: mockPassword } });

    // Assert that the input values are updated correctly
    expect(userNameLogin.value).toBe(mockUserName);
    expect(passwordLogin.value).toBe(mockPassword);

    // Fire login button
    fireEvent.click(loginButton);

    // Assert logout button appears
    let logoutButton = await screen.findByTestId('logout-button');
    expect(logoutButton).toBeInTheDocument();

    // Add items
    // Assert input user form renders
    const itemDetailsInput = screen.getByTestId('item-details-input');
    const assignedToInput = screen.getByTestId('assigned-to-input');
    const addItemButton = screen.getByTestId('add-item-button');

    // Mock user inputs
    const mockTask = 'Task 1';
    const mockAssignedTo = 'Person 1';

    // Input values
    fireEvent.change(itemDetailsInput, { target: { value: mockTask } });
    fireEvent.change(assignedToInput, { target: { value: mockAssignedTo } });

    // Fire add item button
    fireEvent.click(addItemButton);

    // Assert added list item appears on screen
    let listItem = await screen.findByTestId('list-item');
    expect(listItem).toBeInTheDocument();

    // Find and click the delete button
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    // Wait for the list item to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByTestId('list-item')).toBeNull();
    });

    // Fire logout button
    fireEvent.click(logoutButton);

    // Re-query the DOM for the login form fields after logging out
    const loginFormAfterLogout = await screen.findByTestId('login-form');
    const userNameLoginAfterLogout = screen.getByTestId('username-login');
    const passwordLoginAfterLogout = screen.getByTestId('password-login');

    // Assert login form reappears after logging out
    expect(loginFormAfterLogout).toBeInTheDocument();
    expect(userNameLoginAfterLogout).toBeInTheDocument();
    expect(passwordLoginAfterLogout).toBeInTheDocument();
  });
});
