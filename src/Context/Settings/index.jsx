'use strict';

import React, { useState } from 'react';

// Establish context
export const SettingsContext = React.createContext();

const DisplaySettingsProvider = (props) => {
  // Default settings
  const [displayItems] = useState(3); // Default to display three items
  const [hideCompleted, setHideCompleted] = useState(true); // Default to hide completed items

  return (
    <SettingsContext.Provider value={{ displayItems, hideCompleted, setHideCompleted }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default DisplaySettingsProvider;

