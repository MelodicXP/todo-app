import { useContext } from 'react';
import { Fieldset, TextInput, Switch, NumberInput } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';

const SettingsForm = () => {
  const { hideCompleted, setHideCompleted, displayItems, setDisplayItems } = useContext(SettingsContext);

  // Handler for switching visibility of completed tasks
  const handleSwitchChange = (event) => {
    setHideCompleted(event.currentTarget.checked);
  };

  // Handler for changing number of items displayed per page
  const handleNumberInputChange = (value) => {
    setDisplayItems(value);
  };

  return (
    <Fieldset legend="Update Settings">
      <Switch
        defaultChecked={hideCompleted}
        label="Hide Completed ToDos"
        onChange={handleSwitchChange}
      />

      <NumberInput
        label="Items Per Page"
        placeholder="Input Number"
        defaultValue={displayItems}
        min={1}
        max={10}
        onChange={handleNumberInputChange}
      />

      <TextInput label="Sort Keyword" placeholder="difficulty" mt="md" />
    </Fieldset>
  );
};

export default SettingsForm;