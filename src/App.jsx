import React from 'react';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
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
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <DisplaySettingsProvider>
            <NavLink
              className="nav-link"
              href="#required-for-focus"
              label="Home"
              // leftSection={<IconActivity size="1rem" stroke={1.5} />}
              // rightSection={
              //   <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
              // }
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
