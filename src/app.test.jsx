// import React from 'react';
import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App.jsx';


describe('App', () => {
  afterEach(() => {
    cleanup(); // Ensure the DOM is clean after each test
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should Add Item', () => {

    render(<App />);

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
  });

  it('should delete an item', () => {
    render(<App />);

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
  });

  it('should mark item as complete', () => {
    render(<App />);

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

    // Find and click the complete button
    let completeCheckbox = screen.getByTestId('complete-checkbox');
    fireEvent.click(completeCheckbox);

    // Assert the list item is marked as complete
    expect(completeCheckbox).toBeChecked();
  });
});