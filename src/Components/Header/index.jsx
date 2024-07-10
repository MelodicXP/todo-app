const Header = (props) => {
  const { incomplete } = props;
  
  return (
    <header>
      <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
    </header>
  )
}

export default Header;
