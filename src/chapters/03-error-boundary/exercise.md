# Error Boundary Exercise

NOTE: You can comment/uncomment the error in components/preview.js.

1. Create a Modal component using ReactDOM.createPortal in components/modal.js
  - Modal component should render:
    - `div` with class name of `modal`
      - `h3` with content "Email Error"
      - `button` with class "modal-close" and content "Close"
        - onClick of the button should call `props.onClose`
  - The Portal should attach to the DOM element with id `modal-root`

2. Create a class component in components/email-error.js
  - getDerivedStateFromError, show the Modal when an error occurs
  - Hide the Modal on modal close and remove the offending email
  - Using componentDidCatch, log the offending error with console.log

3. Wrap the Preview component in components/inbox.js with the error boundary
  - The error boundary should catch errors on each specific email so other emails can still render