import React from "react";
import { AppConsumer } from "../context";
import Denied from "./denied";
import Empty from "./empty";
import Preview from "./preview";

const Inbox = () => (
  <AppConsumer>
    {({ isAuthenticated, emails }) => {
      if (!isAuthenticated) {
        return <Denied />;
      }

      if (!emails.length) {
        return <Empty />;
      }

      return (
        <ul className="inbox">
          {emails.map(email => {
            return <Preview key={email.id} {...email} />;
          })}
        </ul>
      );
    }}
  </AppConsumer>
);

export default Inbox