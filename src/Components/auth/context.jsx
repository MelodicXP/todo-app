import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

// Create a context to provide login state and actions
export const LoginContext = React.createContext();

// Live API url
const API_URL = import.meta.env.VITE_API;

const LoginProvider = ({ children }) => {
  // State variables to manage login status, user info, and errors
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);

  // Function to check if user has specific capability
  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  // Function to handle user login
  const login = async (username, password) => {
    const request = {
      method: 'post',
      baseURL: API_URL,
      url: './auth/signin',
      auth: {
        username: username,
        password: password
      }
    }

    const response = await axios(request);
    console.log(response.data);

    validateToken(response.data);
  };

  // Function to handle logout
  const logout = () => {
    setLoginState(false, null, {});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Function to validate JWT token
  const validateToken = (data) => {
    try {
      setLoginState(true, data.token, data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      setLoginState(false, null, {}, error);
      console.log('Token Validation Error', error);
    }
  };

  // Function to update login state and save token in cookies
  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save('auth', token);
    setLoggedIn(loggedIn);
    setUser(user);
    setError(error || null);
  };

  // Effect to validate token on component mount
  useEffect(() => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (token) {
      user = JSON.parse(user);
      let data = { token, user };
      validateToken(data);
    }
  }, []);

  return (
    // Provide login state and actions to components
    <LoginContext.Provider value={{ loggedIn, can, login, logout, user, error }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
