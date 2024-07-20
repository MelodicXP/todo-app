import { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import Header from '../Header';
import List from '../List';
import Form from '../Form';
import './Todo.scss';
import axios from 'axios';

// import { v4 as uuid } from 'uuid';

const API = import.meta.env.VITE_API;

const Todo = () => {
  const [defaultValues] = useState({
    difficulty: 4,
  });

  // Initial state of list items (todos)
  const [list, setList] = useState([]);

  // Initial state of incomplete (todos)
  const [incomplete, setIncomplete] = useState([]);

  // Handles all form input logic
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  // Add item and update list state
  async function addItem(item) {
    try {
      // Prepare item data to send
      const newItem = {
        task: item.text,
        assignee: item.assignee,
        difficulty: item.difficulty,
        complete: false
      };

      // Post item to API
      const response = await axios.post(`${API}/api/v1/todo`, newItem);

      // Log response
      console.log('response:', response.data);

      // Response contains updated list with new items
      const itemAdded = response.data;

      // Update the state of list with updated list
      setList((prevList) => [...prevList, itemAdded]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  // Delete item and update list state
  async function deleteItem(id) {
    try {
      // Send DELETE request to API with item id
      const response = await axios.delete(`${API}/api/v1/todo/${id}`);

      // Log response
      console.log('delete response: ', response.data);

      // Get updated todo list
      getTodoList();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  // Toggle completed status
  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  // Get list from live api
  async function getTodoList() {
    const response = await axios.get(`${API}/api/v1/todo`);
    // console.log('response todo list:', response.data);
    setList(response.data);
  }

  // On load get todo list from live api
  useEffect(() => {
    getTodoList();
  }, [])

  // Keep an eye on when list is updated and update count of incomplete
  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    // Save list to localStorage whenever it changes
    localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <Header incomplete={incomplete} />

      <div className='form-list-display'>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          defaultValues={defaultValues.difficulty}
        />

        <List
          list={list}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      </div>
    </>
  );
};

export default Todo;
