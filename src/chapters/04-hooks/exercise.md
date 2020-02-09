# Hooks Exercise

1. Convert the AppProvider to use `useState` and `useEffect`.

2. Convert the `Inbox`, `Preview`, and `NavBar` components to use `useContext`.

3. Separate auth and email logic into their own components.

4. Implement `useCallback` and `useMemo` for:

- isAuthenticated
- emails
- login
- logout
- removeEmail

5. Expose a custom hook for `useAuth` and `useEmail` instead of `useContext`

6. Update `useEmail` to manage state with `useReducer`.

7. Add state and actions to `useEmail` in order to support reverting the most recent email removal. For instance, you might need to save the deleted email and its old index in the list of previews. And you'll need to expose a new function on the context that will allow the inbox to undo a removal.

8. Implement the `Undo` component. It should be:

- `div` with class name of `undo`
  - `button` with class name of `undo-button`
    - `h3` with class name of `undo-title`
    - `img` with source of the `undo.png` icon and class name of `undo-image`

When the button is clicked, it should undo the most recent email removal.

9. Render the `Undo` component in the inbox at the same index as the most recently removed email. Removing another email will render the `Undo` component at a new index (at the index of the most recently removed email).
