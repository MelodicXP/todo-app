import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App.jsx';
import LoginProvider from './Components/auth/context.jsx'; // Import LoginProvider


describe('App', () => {
  afterEach(() => {
    cleanup(); // Ensure the DOM is clean after each test
    localStorage.clear(); // Clear localStorage after each test
  });

  const renderWithProviders = (ui, options) => {
    return render(<LoginProvider>{ui}</LoginProvider>, options);
  };

  it('should login and logout user', () => {

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
    fireEvent.change(userNameLogin, {target: {value: mockUserName}});
    fireEvent.change(passwordLogin, {target: {value: mockPassword}});

    // Assert that the input values are updated correctly
    expect(userNameLogin.value).toBe(mockUserName);
    expect(passwordLogin.value).toBe(mockPassword);

    // Fire login button
    fireEvent.click(loginButton);
    
    // Assert logout button appears
    let logoutButton = screen.getByTestId('logout-button');
    expect(logoutButton).toBeInTheDocument();

    // Fire logout button
    fireEvent.click(logoutButton);

    // Re-query the DOM for the login form fields after logging out
    const loginFormAfterLogout = screen.getByTestId('login-form');
    const userNameLoginAfterLogout = screen.getByTestId('username-login');
    const passwordLoginAfterLogout = screen.getByTestId('password-login');

    // Assert login form reappears after logging out
    expect(loginFormAfterLogout).toBeInTheDocument();
    expect(userNameLoginAfterLogout).toBeInTheDocument();
    expect(passwordLoginAfterLogout).toBeInTheDocument()
    
  });

  it('should login admin user and add item', () => {

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
    fireEvent.change(userNameLogin, {target: {value: mockUserName}});
    fireEvent.change(passwordLogin, {target: {value: mockPassword}});

    // Assert that the input values are updated correctly
    expect(userNameLogin.value).toBe(mockUserName);
    expect(passwordLogin.value).toBe(mockPassword);

    // Fire login button
    fireEvent.click(loginButton);
    
    // Assert logout button appears
    let logoutButton = screen.getByTestId('logout-button');
    expect(logoutButton).toBeInTheDocument();


    // Add items
    // Assert input user form renders
    const itemDetailsInput = screen.getByTestId('item-details-input');
    const assignedToInput = screen.getByTestId('assigned-to-input');
    const addItemButton = screen.getByTestId('add-item-button');
    // const difficulty = screen.getByTestId('difficulty');

    // Mock user inputs
    let mockTask = 'Task 1';
    let mockAssignedTo = 'Person 1';
    let mockDifficulty = 4;

    // Input values
    fireEvent.change(itemDetailsInput, {target: {value: mockTask}});
    fireEvent.change(assignedToInput, {target: {value: mockAssignedTo}});

    // Assert that the input values are updated correctly
    expect(itemDetailsInput.value).toBe(mockTask);
    expect(assignedToInput.value).toBe(mockAssignedTo);

    // Fire add item button
    fireEvent.click(addItemButton);
    
    // Assert added list item appears on screen
    let listItems = screen.getAllByTestId('list-item'); // Get all items
    expect(listItems.length).toBeGreaterThan(0); // Ensure at least one item is present
    
    let completeCheckbox = screen.getAllByTestId('complete-checkbox')[0];

    // Assert the checkbox is not checked initially
    expect(completeCheckbox).not.toBeChecked();

    // Toggle the checkbox
    fireEvent.click(completeCheckbox);

    // Assert list items contains expected data
    expect(listItems[0].textContent).toContain(mockTask);
    expect(listItems[0].textContent).toContain(mockAssignedTo);
    expect(listItems[0].textContent).toContain(mockDifficulty);

    // Assert the checkbox is now checked
    expect(completeCheckbox).toBeChecked();

    // Fire logout button
    fireEvent.click(logoutButton);

    // Re-query the DOM for the login form fields after logging out
    const loginFormAfterLogout = screen.getByTestId('login-form');
    const userNameLoginAfterLogout = screen.getByTestId('username-login');
    const passwordLoginAfterLogout = screen.getByTestId('password-login');

    // Assert login form reappears after logging out
    expect(loginFormAfterLogout).toBeInTheDocument();
    expect(userNameLoginAfterLogout).toBeInTheDocument();
    expect(passwordLoginAfterLogout).toBeInTheDocument()
    
  });

  it('should login admin user and delete item', () => {

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
    fireEvent.change(userNameLogin, {target: {value: mockUserName}});
    fireEvent.change(passwordLogin, {target: {value: mockPassword}});

    // Assert that the input values are updated correctly
    expect(userNameLogin.value).toBe(mockUserName);
    expect(passwordLogin.value).toBe(mockPassword);

    // Fire login button
    fireEvent.click(loginButton);
    
    // Assert logout button appears
    let logoutButton = screen.getByTestId('logout-button');
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
    // fireEvent.change(difficulty, { target: { value: mockDifficulty } });

    // Fire add item button
    fireEvent.click(addItemButton);

    // Assert added list item appears on screen
    let listItem = screen.getByTestId('list-item');
    expect(listItem).toBeInTheDocument();

    // Find and click the delete button
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    // Assert the list item is no longer present
    expect(listItem).not.toBeInTheDocument();

    // Fire logout button
    fireEvent.click(logoutButton);

    // Re-query the DOM for the login form fields after logging out
    const loginFormAfterLogout = screen.getByTestId('login-form');
    const userNameLoginAfterLogout = screen.getByTestId('username-login');
    const passwordLoginAfterLogout = screen.getByTestId('password-login');

    // Assert login form reappears after logging out
    expect(loginFormAfterLogout).toBeInTheDocument();
    expect(userNameLoginAfterLogout).toBeInTheDocument();
    expect(passwordLoginAfterLogout).toBeInTheDocument()
    
  });
});