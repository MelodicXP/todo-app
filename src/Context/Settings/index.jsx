'use strict';

import React, {useState} from 'react';

// Establish context
export const SettingsContext = React.createContext();

const DisplaySettingsProvider = (props) => {

  // Default settings
  const [displayItems] = useState(3); // Default to display three items
  const [hideComplete, setHideComplete] = useState(false); // Default to hide completed items

  return (
    <SettingsContext.Provider value={{ displayItems, hideComplete, setHideComplete }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default DisplaySettingsProvider;
