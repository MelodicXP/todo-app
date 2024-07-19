import {useState, useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from './context.jsx';
import { Button, Fieldset, Group, TextInput } from '@mantine/core';
import './Login.scss';

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
        <Group className="logout-button">
          <Button 
            onClick={logout}
            color="red" 
            id='logout-button' 
            data-testid="logout-button"
          >
            Log Out
          </Button>
        </Group>
      </When>

      <When condition={!loggedIn}>
        <Fieldset 
          component="form" 
          onSubmit={handleSubmit}
          className='login-form'
          bg="blue"
          bd="none"
        >
          <TextInput
            placeholder="UserName"
            name="username"
            onChange={handleChange}
            mr="sm"
          />

          <TextInput
            placeholder="password"
            name="password"
            onChange={handleChange}
          />

          <Group>
            <Button
              color="#343a40" 
              id='login-button' 
              type="submit" 
              data-testid="login-button"
              ml="sm"
            >
              Login
            </Button>
          </Group>
        </Fieldset>
      </When>
    </>
  );
};

export default Login;
