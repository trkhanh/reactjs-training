# Context Exercise

1. Use React.createContext to export a Provider and Consumer in context/index.js

2. Move the state from the top level App state to the context Provider.
  - The value for the provider should be an object containing the following state and actions:
    - isAuthenticated
    - emails
    - login
    - logout
    - removeEmail

2. In index.js render the newly created AppProvider with the rest of the app as children.

3. Move the polling functionality from the Inbox component to the context
Provider component.

4. Update the Inbox component to use the new context Consumer.

5. Update the NavBar component to use the new context Consumer.

6. Update the Preview component to use the new context Consumer.
