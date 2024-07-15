import { useContext, useState } from 'react';
import { Fieldset, TextInput, Switch, NumberInput, Grid, Card, Text, Group, Button } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';
import Header from '../Header';
import './SettingsForm.scss';

const SettingsForm = () => {
  const { hideCompleted, setHideCompleted, displayItems, setDisplayItems } = useContext(SettingsContext);
  const [settingsSubmitted, setSettingsSubmitted] = useState(false); // State to track settings submission

  // Handler for switching visibility of completed tasks
  const handleSwitchChange = (event) => {
    const newValue = event.currentTarget.checked;
    setHideCompleted(newValue);
    localStorage.setItem('hideCompleted', newValue); // Save to localStorage
  };

  // Handler for changing number of items displayed per page
  const handleNumberInputChange = (value) => {
    setDisplayItems(value);
    localStorage.setItem('displayItems', value); // Save to localStorage
  };

  // Handler for showing updated settings
  const handleSubmit = (event) => {
    event.preventDefault();
    setSettingsSubmitted(true); // Set state to true when button is clicked
  };

  return (
    <div className='user-settings'>

      <Header/>

      <Grid
        mt="md"
      >
        <Grid.Col span={6}>
          <Fieldset component="form" legend="Update Settings" onSubmit={handleSubmit} shadow="sm" padding="lg" radius="md" withBorder> 
            <Switch
              defaultChecked={hideCompleted}
              label="Hide Completed ToDos"
              onChange={handleSwitchChange}
              mt="md"
            />

            <NumberInput
              label="Items Per Page"
              placeholder="Input Number"
              value={displayItems}
              min={1}
              max={10}
              onChange={handleNumberInputChange}
              mt="md"
            />

            <TextInput label="Sort Keyword" placeholder="difficulty" mt="md" />

            <Button 
              fullWidth 
              mt="md" 
              id='show-settings-button' 
              type="submit" 
              data-testid="show-settings-button"
            >
              Show New Settings
            </Button>
          </Fieldset>
        </Grid.Col>

        {settingsSubmitted && ( // Conditionally render the second Grid.Col
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Updated Settings</Text>
              </Group>
              <Text size="sm">
                <p>Hide Completed ToDos: {hideCompleted ? 'Yes' : 'No'}</p>
                <p>Items Per Page: {displayItems}</p>
              </Text>
            </Card>
          </Grid.Col>
        )}
      </Grid>
    </div>


  );
};

export default SettingsForm;
