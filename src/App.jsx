import React from 'react';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import '@mantine/core/styles.css';
import { NavLink } from '@mantine/core';
// import { IconChevronRight, IconActivity} from '@tabler/icons-react';
import Todo from './Components/Todo';
import Footer from './Components/Footer';
import './App.scss'

// Import display settings provider
import DisplaySettingsProvider from './Context/Settings';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MantineProvider>
          <DisplaySettingsProvider>
            <NavLink
              className="nav-link"
              href="#required-for-focus"
              label="Home"
              variant="filled"
              active
            />
            <Todo />
            <Footer />
          </DisplaySettingsProvider>
        </MantineProvider>
      </React.Fragment>
    );
  }
}
