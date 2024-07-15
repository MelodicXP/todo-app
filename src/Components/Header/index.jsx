import { useLocation } from 'react-router-dom';
import './Header.scss';

const Header = (props) => {
  const { incomplete } = props;
  const location = useLocation();

  return (
    <header className='todo-header' data-testid="todo-header">
      {location.pathname === '/' && (
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      )}
      {location.pathname === '/settings' && (
        <h1 data-testid="userSetting-h1">Manage Settings</h1>
      )}
    </header>
  );
}

export default Header;
