import './Form.scss';
import { Fieldset, TextInput, Button, Group} from '@mantine/core';
import { Slider, Text } from '@mantine/core';
import Auth from '../auth/auth';

const Form = (props) => {

  const { handleSubmit, handleChange, defaultValues } = props;
  return (
    <Fieldset component="form" onSubmit={handleSubmit} legend="Add To Do Item">

      <TextInput
        data-testid="item-details-input" 
        label="To Do Item" 
        placeholder="Item Details" 
        onChange={handleChange} 
        name="text"  
        required  
      />

      <TextInput 
        data-testid="assigned-to-input"
        label="Assigned To" 
        placeholder="Assignee Name" 
        onChange={handleChange} 
        name="assignee" 
        mt="md" 
        required
      />

      <Text size="md" mt="xl">Difficulty</Text>
      <Slider 
        defaultValue={defaultValues} 
        min={1} 
        max={5} step={1} 
        onChange={handleChange} 
        name="difficulty" 
        data-testid="difficulty" 
        mt="sm"
      />

      <Group>
        <Auth capability="create">
          <Button fullWidth mt="md" id='add-item-button' type="submit" data-testid="add-item-button">Add Item</Button>
        </Auth>
      </Group>

    </Fieldset>
  )
}

export default Form;