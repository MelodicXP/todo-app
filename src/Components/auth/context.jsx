import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import {jwtDecode} from 'jwt-decode';
// import { test } from 'vitest';

// Mock user data for testing purpose
const testUsers = {
  admin: {
    password: 'ADMIN',
    name: 'Administrator',
    // "capabilities": "['create','read','update','delete']",
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  editor: {
    password: 'EDITOR',
    name: 'Editor',
    // "capabilities": "['read','update']",
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  writer: {
    password: 'WRITER',
    name: 'Writer',
    // "capabilities": "['create']",
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  user: {
    password: 'USER',
    name: 'User',
    // "capabilities": "['read']",
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

// Create a context to provide login state and actions
export const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
  // State variables to manage login status, user info, and errors
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setTokoen] = useState(null);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);

  // Function to check if user has specific capability
  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  // Function to handle user login
  const login = async (username, password) => {
    let auth = testUsers[username];

    if (auth && auth.password === password) {
      try {
        validateToken(auth.token);
      } catch (error) {
        setLoginState(loggedIn, token, user, error);
        console.error(error);
      }
    }
  };

  // Function to handle logout
  const logout = () => {
    setLoginState(false, null, {});
  };

  // Function to validate JWT token
  const validateToken = (token) => {
    try {
      let validUser = jwtDecode(token);
      setLoginState(true, token, validUser);
    } catch (error) {
      setLoginState(false, null, {}, error);
      console.log('Token Validation Error', error);
    }
  };

  // Function to update login state and save token in cookies
  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save('auth', token);
    setTokoen(token);
    setLoggedIn(loggedIn);
    setUser(user);
    setError(error || null);
  };

  // Effect to validate token on component mount
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    // Provide login state and actions to components
    <LoginContext.Provider value={{ loggedIn, can, login, logout, user, error }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
