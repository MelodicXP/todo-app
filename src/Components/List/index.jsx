const List = (props) => {
  const { list, toggleComplete, deleteItem } = props;
  
  return(
    <>
      {list.map(item => (
        <div key={item.id} >
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <button type="button" onClick={() => deleteItem(item.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </>
  )
}

export default List;