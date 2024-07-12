import { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination } from '@mantine/core';
import './List.scss';

const List = (props) => {
  const { list, toggleComplete, deleteItem } = props;
  const { displayItems, hideCompleted } = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1); // State to manage active page

  // UseEffect to handle filtering logic whenever list or hideCompleted changes
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(hideCompleted ? list.filter(item => !item.complete) : list); 
  }, [list, hideCompleted]);

  // Adjust active page if current page becomes empty after deletion
  useEffect(() => {
    const totalPages = Math.ceil(filteredList.length / displayItems);
    if (activePage > totalPages) {
      setActivePage(totalPages > 0 ? totalPages : 1);
    }
  }, [filteredList, displayItems, activePage]);

  // Filter and slice the list based on settings and pagination
  const totalItems = filteredList.length;
  const startIndex = (activePage - 1) * displayItems;
  const displayList = filteredList.slice(startIndex, startIndex + displayItems);

  return (
    <div className='list'>
      {displayList.map(item => (
        <div key={item.id} className='list-item' data-testid="list-item">
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)} data-testid="complete-button">Complete: {item.complete.toString()}</div>
          <button id='delete-button' type="button" onClick={() => deleteItem(item.id)} data-testid="delete-button">Delete</button>
        </div>
      ))}
      <Pagination
        className='pagination'
        page={activePage}
        onChange={setActivePage}
        total={Math.ceil(totalItems / displayItems)}
      />
    </div>
  );
}

export default List;
