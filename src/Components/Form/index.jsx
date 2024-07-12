import './Form.scss'

const Form = (props) => {

  const { handleSubmit, handleChange, defaultValues } = props;
  return (
    <form className='form' onSubmit={handleSubmit}>

      <h2>Add To Do Item</h2>

      <label>
        <span>To Do Item</span>
        <input onChange={handleChange} name="text" type="text" placeholder="Item Details" data-testid="item-details-input"/>
      </label>

      <label>
        <span>Assigned To</span>
        <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" data-testid="assigned-to-input"/>
      </label>

      <label>
        <span>Difficulty</span>
        <input onChange={handleChange} defaultValue={defaultValues} type="range" min={1} max={5} name="difficulty" data-testid="difficulty"/>
      </label>

      <label>
        <button id='add-item-button' type="submit" data-testid="add-item-button">Add Item</button>
      </label>
    </form>
  )
}

export default Form;