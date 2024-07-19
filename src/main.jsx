import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import LoginProvider from './Components/auth/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>
);
