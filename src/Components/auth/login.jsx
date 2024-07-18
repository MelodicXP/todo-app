import {useState, useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from './context.jsx';
import { Button, Group } from '@mantine/core';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { loggedIn, login, logout } = useContext(LoginContext);

  // Handle input change
  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials.username, credentials.password);
  };

  return (
    <>
      <When condition={loggedIn}>
        <Group>
          <Button 
            onClick={logout}
            mt="sm"
            color="red" 
            id='logout-button' 
            data-testid="logout-button"
          >
            Log Out
          </Button>
        </Group>
      </When>

      <When condition={!loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <input
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <Group>
            <Button
              mt="sm"
              color="#343a40" 
              id='login-button' 
              type="submit" 
              data-testid="login-button"
            >
              Login
            </Button>
          </Group>
        </form>
      </When>
    </>
  );
};

export default Login;
