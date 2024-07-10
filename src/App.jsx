import React from 'react';

import Todo from './Components/Todo';
import Footer from './Components/Footer';

// Import display settings provider
import DisplaySettingsProvider from './Context/Settings';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DisplaySettingsProvider>
          {/* <header>
            <h1 Home </h1>
          </header> */}
          <Todo />
          <Footer />
        </DisplaySettingsProvider>
      </React.Fragment>
    );
  }
}
