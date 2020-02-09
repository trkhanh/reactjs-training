import React from "react";
import { AppConsumer } from "../context";
import Denied from "./denied";
import Empty from "./empty";
import Preview from "./preview";
import EmailError from "./email-error";

const Inbox = () => (
  <AppConsumer>
    {({ isAuthenticated, emails, removeEmail }) => {
      if (!isAuthenticated) {
        return <Denied />;
      }

      if (!emails.length) {
        return <Empty />;
      }

      return (
        <ul className="inbox">
          {emails.map(email => {
            return (
              <EmailError key={email.id} onClear={() => removeEmail(email.id)}>
                <Preview {...email} />
              </EmailError>
            );
          })}
        </ul>
      );
    }}
  </AppConsumer>
);

export default Inbox