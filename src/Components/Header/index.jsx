import './Header.scss';

const Header = (props) => {
  const { incomplete } = props;
  
  return (
    <header 
      className='todo-header'
      data-testid="todo-header"
    >
      <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
    </header>
  )
}

export default Header;
