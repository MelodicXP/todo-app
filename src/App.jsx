import React from 'react';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import '@mantine/core/styles.css';
import { NavLink } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'; 
import Todo from './Components/Todo';
import Footer from './Components/Footer';
import SettingsForm from './Components/SettingsForm'; // Import SettingsForm component
import './App.scss';

// Import display settings provider
import DisplaySettingsProvider from './Context/Settings';

export default class App extends React.Component {
  render() {
    return (
      <DisplaySettingsProvider>
        <MantineProvider>
          <Router>
            <nav>
              <NavLink
                className="nav-link"
                href="/"
                label="Home"
                variant="filled"
                active
              />
              <NavLink
                className="nav-link"
                href="/settings"
                label="Settings"
                variant="filled"
                active
              />

            <Routes>
              <Route path="/" element={<Todo />} /> {/* Modified: Use element prop */}
              <Route path="/settings" element={<SettingsForm />} /> {/* Modified: Use element prop */}
            </Routes>
            </nav>
          </Router>
          <Footer />
        </MantineProvider>
      </DisplaySettingsProvider>
    );
  }
}
