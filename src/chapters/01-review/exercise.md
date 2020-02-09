# State Exercise:

1. Implement the `Denied` component with the following structure.
  - `p` element with class of `denied` and text of `Please login to see emails.`

2. Update the App component to hold state for:
  - isAuthenticated (set to false)
  - Emails - set to the helper method `fetchEmails(5)`

3. On component mount:
  - Start an interval that generates a new email every 4 seconds.

4. On unmount:
  - Don’t forget to clear the polling email interval

5. Add class methods to the App component for:
  - login
  - logout
  - removeEmail

6. Update the NavBar to correctly login and logout

7. Update the inbox component to show the denied and empty messages

8. Update the preview component to handle removeEmail function
