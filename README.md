# 401 - Lab 33 - \<Login /> and \<Auth />

## Project: To-Do App

### Author: Melo

### Problem Domain

To Do List Manager Phase 3: Adding security and access controls to the application.  In this final phase, require that users be logged in, in order to see the to do items. Additionally, based on their user type, they will be allowed (or denied) to perform actions such as editing or deleting them.

### Feature Tasks & Requirements

Extend the functionality of the application by requiring users be logged in to view items and also restrict access based on user type. The user stories from Phases 1, and 2 remain unchanged. For this phase, we are now adding the following new user stories.

* As a user, I want to provide a way for other users to create new accounts.
* As a user, I want to provide a way for all users to login to their account.
* As a user, I want to make sure that my To Do items are only viewable to users that have logged in with a valid account.
* As a user, I want to ensure that only fellow users that are allowed to “create”, based on their user type, can add new To Do Items.
* As a user, I want to ensure that only fellow users that are allowed to “update”, based on their user type, can mark To Do Items complete.
* As a user, I want to ensure that only fellow users that are allowed to “delete”, based on their user type, can delete new To Do Items

### Technical Requirements/Notes

1. Implement a Login/Auth React Context, “protect” the To Do application by restricting access to the various application features based on the users’ login status and capabilities.

    * Define a function that can simulate a login event.
        * Parameters: username and password as strings.
        * Sets a User on the auth context, and changes login status to true.
    * Define a function that can simulate a logout event.
        * Resets the User object and changes login status to `false.
    * Define a function that can authorize a User based on a capability.
        * Parameters: a capability as a string.
        * Returns a boolean whether the user has the capability parameter.

2. Create an \<Auth /> component with the following features:

    * Given a capability prop of type string, conditionally render components based on the user stored in context.
    * Hide the entire interface until the user has logged in.
    * Implements the following RBAC rules:
        * Logged In Users with ‘update’ permissions can click the records to mark them as complete.
        * Logged In Users with ‘create’ permissions can create new items.
        * Logged In Users with ‘delete’ permissions can delete items.
        * Logged In Users with ‘read’ permissions can see the list of To Do Items.

**Note:** since only writers can ‘create’ and add new Todo items to state, in this lab, a person with read only access will not see any Todo items. This will change in the next lab once we populate Todo items from a database on page load.

1. Implement a \<Login /> Component that has the following features:

    * Provide an account login screen with a form.
        * Accepts Username and Password.
        * On successful login, store the token as a cookie.
    * If a user returns and has a valid login cookie, hide the login form and consider them “Logged In”.
        * Display a logout button instead of a form if they are “Logged In”.

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

* "@mantine/carousel": "^7.11.1",
* "@mantine/charts": "^7.11.1",
* "@mantine/code-highlight": "^7.11.1",
* "@mantine/core": "^7.11.1",
* "@mantine/dates": "^7.11.1",
* "@mantine/dropzone": "^7.11.1",
* "@mantine/form": "^7.11.1",
* "@mantine/hooks": "^7.11.1",
* "@mantine/modals": "^7.11.1",
* "@mantine/notifications": "^7.11.1",
* "@mantine/nprogress": "^7.11.1",
* "@mantine/spotlight": "^7.11.1",
* "@mantine/tiptap": "^7.11.1",
* "@tabler/icons-react": "^3.10.0",
* "@tiptap/extension-link": "^2.4.0",
* "@tiptap/react": "^2.4.0",
* "@tiptap/starter-kit": "^2.4.0",
* "dayjs": "^1.11.11",
* "embla-carousel-react": "^8.1.6",
* "react": "^18.3.1",
* "react-dom": "^18.3.1",
* "react-router-dom": "^6.24.1",
* "recharts": "^2.12.7",
* "sass": "^1.77.6",
* "uuid": "^10.0.0"

Dev Dependencies

* "@testing-library/jest-dom": "^6.4.6",
* "@testing-library/react": "^16.0.0",
* "@testing-library/user-event": "^14.5.2",
* "@types/react": "^18.3.3",
* "@types/react-dom": "^18.3.0",
* "@vitejs/plugin-react": "^4.3.1",
* "eslint": "^8.57.0",
* "eslint-plugin-react": "^7.34.2",
* "eslint-plugin-react-hooks": "^4.6.2",
* "eslint-plugin-react-refresh": "^0.4.7",
* "jest": "^29.7.0",
* "jsdom": "^24.1.0",
* "postcss": "^8.4.39",
* "postcss-preset-mantine": "^1.15.0",
* "postcss-simple-vars": "^7.0.1",
* "vite": "^5.3.1",
* "vitest": "^2.0.2"

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Testing

* App.jsx testing to assert adding, deleting, and completing items
* Settings.jsx testing to assert context consumed by child components.

### Link to Pull Request ---> [Pull Request](https://github.com/MelodicXP/todo-app/pull/5)
