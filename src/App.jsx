import React from 'react';

import Todo from './Components/Todo';
import Footer from './Components/Footer';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <header>
          <h1 Home </h1>
        </header> */}
        <Todo />
        <Footer />
      </React.Fragment>
    );
  }
}
