import React from "react";
import { emails as initialEmails, generateEmail } from "../../../utils/email";

const EmailContext = React.createContext();

const init = emails => ({
  emails,
  removedEmailInfo: null
});

const removeEmail = (state, removeId) => {
  const { emails } = state;
  const removedEmailIndex = state.emails.findIndex(
    email => email.id === removeId
  );
  if (removedEmailIndex < 0) {
    console.warn("Cannot find email to remove.");
    return state;
  }

  const removedEmail = emails[removedEmailIndex];
  const filteredEmails = emails.filter(email => {
    return email.id !== removeId;
  });

  return {
    emails: filteredEmails,
    removedEmailInfo: { email: removedEmail, index: removedEmailIndex }
  };
};

const undoRemoveEmail = state => {
  const { removedEmailInfo, emails } = state;
  if (!removedEmailInfo) {
    console.warn("Cannot undo non-existent email removal");
    return state;
  }

  const updatedEmails = [...emails];
  updatedEmails.splice(removedEmailInfo.index, 0, removedEmailInfo.email);

  return {
    emails: updatedEmails,
    removedEmailInfo: null
  };
};

const emailsReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        emails: [...state.emails, action.payload]
      };
    case "remove":
      return removeEmail(state, action.payload);
    case "undoRemoveEmail":
      return undoRemoveEmail(state);
    default:
      return state;
  }
};

export function EmailProvider(props) {
  const [state, dispatch] = React.useReducer(
    emailsReducer,
    initialEmails,
    init
  );

  const { emails, removedEmailInfo } = state;

  React.useEffect(() => {
    const polling = setInterval(() => {
      if (emails.length < 5) {
        const newEmail = generateEmail();
        dispatch({ type: "add", payload: newEmail });
      }
    }, 4000);

    return function cleanup() {
      clearInterval(polling);
    };
  }, [emails]);

  const removeEmail = React.useCallback(id => {
    dispatch({ type: "remove", payload: id });
  }, []);

  const undoRemoveEmail = React.useCallback(() => {
    dispatch({ type: "undoRemoveEmail" });
  }, []);

  const value = React.useMemo(() => {
    return {
      emails,
      removedEmailInfo,
      removeEmail,
      undoRemoveEmail
    };
  }, [emails, removedEmailInfo, removeEmail, undoRemoveEmail]);

  return <EmailContext.Provider value={value} {...props} />;
}

export function useEmail() {
  const context = React.useContext(EmailContext);

  if (!context) {
    throw new Error("useEmail must be used within an EmailProvider");
  }

  return context;
}
