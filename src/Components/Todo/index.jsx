import { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import Header from '../Header';
import List from '../List';
import Form from '../Form';
import './Todo.scss';

import { v4 as uuid } from 'uuid';

const Todo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  
  // Handles all form input logic
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  // Add item and update list state
  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  // Delete item and udpate list state
  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
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

  // Keep an eye on when list is updated and update count of incomplete
  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    // document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
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
