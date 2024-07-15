'use strict';

import React, { useState, useEffect } from 'react';

// Establish context
export const SettingsContext = React.createContext();

const DisplaySettingsProvider = (props) => {
  // Load initial settings from localStorage or use default values
  const initialDisplayItems = localStorage.getItem('displayItems')
    ? parseInt(localStorage.getItem('displayItems'), 10)
    : 3;
  const initialHideCompleted = localStorage.getItem('hideCompleted')
    ? JSON.parse(localStorage.getItem('hideCompleted'))
    : false;

  const [displayItems, setDisplayItems] = useState(initialDisplayItems); // Load from localStorage
  const [hideCompleted, setHideCompleted] = useState(initialHideCompleted); // Load from localStorage

  // Save displayItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('displayItems', displayItems);
  }, [displayItems]);

  // Save hideCompleted to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hideCompleted', hideCompleted);
  }, [hideCompleted]);

  return (
    <SettingsContext.Provider value={{ displayItems, setDisplayItems, hideCompleted, setHideCompleted }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default DisplaySettingsProvider;
