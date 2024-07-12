# 401 - Lab 31 - Context API

## Project: To-Do App

### Author: Melo

### Problem Domain

Phase 1, perform some refactoring of a Todo application built by another team. This application mixes application state and user settings at the top level and passes things around.

### Feature Tasks & Requirements

* Create a Detailed UML.
* Properly modularize the application into separate components, note the proposed file structure below.
* Implement the Context API to make some basic application settings available to components.
  * Show three incomplete todo tasks/items by default.
  * Hide completed items by default.
  * Add the sort word ‘difficulty’ by default.
  * View additional incomplete tasks by using pagination
* Style the application using the Mantine Component API{target:_blank}.
  * NOTE: The expectation to style this entire component in one day is likely unrealistic. The recommendation is to implement the required functionality, then systematically begin styling with Mantine. Match the comp image(s) as closely as possible. 80% of the design work will likely take 20% of your time. By the end of the week, being mostly there with style is the goal!

### Technical Requirements/Notes

1. Implement the React context API for defining settings across the entire application.

    * Create React Context for managing application display settings and provide this at the application level.
    * Add the following defaults to the context provider’s state, they will not be changeable in this lab.
      * Display three items.
      * Hide completed items using a boolean.
      * Define “difficulty” as a default sort word to optionally use in the stretch goal.

2. Consume and utilize context values throughout your components.

    * Show a maximum of three items per screen by default in the \<List /> component.
    * Use the Mantine \<Pagination /> component to allow users to navigate a list of items.
    * Hide completed items in the list by default (the ability to show will be added in a later lab).

**Pagination Notes:**

* Only display the first n items in the list, where n is the default number three from your settings context.
  * If you have more than n items in the list, the \<Pagination /> component will add a button that, when clicked, will replace the list with the next n. items in the list.
  * the \<Pagination /> component will manage the “previous” and “next” buttons upon correct implementation.

## Documentation

![UML](./assets/UML.png)

![Screenshot](./assets/screenshotLab31.png)

### Describe how global state is consumed by the components

#### Components Consuming Global State

1. App Component:

    * The App component wraps its children (Todo and Footer) with DisplaySettingsProvider and MantineProvider. This makes the context values available to any nested component.

2. Todo Component:

    * The Todo component does not directly consume the SettingsContext, but it passes the list and functions (toggleComplete, deleteItem) down to the List component, which does consume the context.

3. List Component:

    * The List component uses useContext to access the global state provided by SettingsContext.
    * It uses displayItems to determine how many items to display per page.
    * It uses hideCompleted to filter out completed items if this setting is true.
    * The context values are used within the useEffect hook and rendering logic to dynamically adjust the displayed list of items based on the settings.

### Describe the operation of the hook: useForm()

#### Operation of the useForm Hook

The useForm hook is a custom hook designed to handle form state management and submission logic.

1. State Initialization:

    * const [values, setValues] = useState({});
    * Initializes a state variable values to hold form field values.

2. Handle Form Submission:

    * const handleSubmit = (event) => { ... }
    * Prevents the default form submission behavior using event.preventDefault().
    * Calls the callback function (passed to useForm) with the current form values (values).

3. Handle Form Field Changes:

    * const handleChange = (event) => { ... }
    * Updates the values state based on the form field changes.
    * Determines the name and value of the form field that triggered the event.
    * Handles special cases like sliders (used for difficulty in this case) where the event might not be a standard form event.
    * Updates the state with the new value of the form field.

4. Effect Hook for Initial Values:

    * useEffect(() => { setValues(defaultValues); }, [defaultValues]);
    * Sets the initial values of the form fields when the component mounts.
    * The defaultValues can be passed to the hook to initialize the form fields.

5. Return Values and Functions:

    * The hook returns an object containing handleChange, handleSubmit, and values.
    * These functions and state are used by the component that calls the useForm hook to manage form interactions.

### How to initialize/run application (where applicable)

* npm run dev

### Libraries needed (where applicable)

Install

* "@mantine/core": "^7.11.1",
* "@mantine/hooks": "^7.11.1",
* "@tabler/icons-react": "^3.10.0",
* "react": "^18.3.1",
* "react-dom": "^18.3.1",
* "sass": "^1.77.6",
* "uuid": "^10.0.0"

Dev Dependencies

* "@types/react": "^18.3.3",
* "@types/react-dom": "^18.3.0",
* "@vitejs/plugin-react": "^4.3.1",
* "eslint": "^8.57.0",
* "eslint-plugin-react": "^7.34.2",
* "eslint-plugin-react-hooks": "^4.6.2",
* "eslint-plugin-react-refresh": "^0.4.7",
* "vite": "^5.3.1"

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Testing

* App.jsx testing to assert adding, deleting, and completing items
* Settings.jsx testing to assert context consumed by child components.

### Link to Pull Request ---> [Pull Request](https://github.com/MelodicXP/todo-app/pull/1)
